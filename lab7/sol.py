import angr
import sys
proj = angr.Project('./login', auto_load_libs=False)
start_state = proj.factory.entry_state()
simgr = proj.factory.simgr(start_state)

simgr.explore(find=lambda s: b'Login success' in s.posix.dumps(1))

if simgr.found:
solution_state = simgr.found[0]
password = solution_state.posix.dumps(0).strip()
print(password.decode())
else:
print("Password not found.")
