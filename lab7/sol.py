import angr, sys
proj = angr.project('./login')
init_state = Proj.factory.entry_state()
simulation = proj.factory.simgr(init_state)

def success_condition(state):
	return b"Login successful" in state.posix.dumpss(sys.stdout.fileno())
def fail_condition(state):
	return b"Login failed" in state.posix.dumps(sys.stdout.fileno)
simulation.explore(find=success_condition, avoid=fail_condition)
solution = simulation.found[0]
print(solution.posix.dumps(sys.stdin.fileno())) 
#b'HETOBRCUVWOBFEBB'
