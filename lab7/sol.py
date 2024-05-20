import angr
import sys

def main():
    def success(state):
        return b"Login successful" in state.posix.dumps(sys.stdout.fileno())

    def failed(state):
        return b"Login failed" in state.posix.dumps(sys.stdout.fileno())

    proj = angr.Project('./login')
    init_state = proj.factory.entry_state()
    simulation = proj.factory.simgr(init_state)

    simulation.explore(find=success, avoid=failed)
    solution =  simulation.found[0]
    print(solution.posix.dumps(sys.stdin.fileno()))

if __name__ == '__main__':
    main()
