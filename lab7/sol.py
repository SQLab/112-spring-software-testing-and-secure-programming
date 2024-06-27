import angr
import sys

def is_login_successful(state):
    output = state.posix.dumps(sys.stdout.fileno())
    return b"Login successful" in output

def is_login_failed(state):
    output = state.posix.dumps(sys.stdout.fileno())
    return b"Login failed" in output


proj = angr.Project('./login')
initial_state = proj.factory.entry_state()
sim_manager = proj.factory.simgr(initial_state)


sim_manager.explore(find=is_login_successful, avoid=is_login_failed)


solution = sim_manager.found[0]
print(solution.posix.dumps(sys.stdin.fileno()))
