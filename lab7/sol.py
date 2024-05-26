In [1]: import angr, sys
In [2]: proj = angr.Project('./login')
In [3]: init_state = proj.factory.entry_state()
In [4]: simulation = proj.factory.simgr(init_state)
In [5]: simulation.explore(find=sucess_condition, avoid=fail_condition)
In [6]: def success_condition(state):
   ...:     return b"Login successful" in state.posix.dumps(sys.stdout.fileno())
   ...:
In [7]: def fail_condition(state):
   ...:     return b"Login failed" in state.posix.dumps(sys.stdout.fileno())
   ...:
In [8]: simulation.explore(find=success_condition, avoid=fail_condition)
In [9]: solution = simulation.found[0]
In [10]: print(solution.posix.dumps(sys.stdin.fileno()))
b'HETOBRCUVWOBFEBB'