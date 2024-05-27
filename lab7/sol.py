import angr
import claripy

# 定義成功和失敗訊息的條件
def is_successful(state):
    stdout_output = state.posix.dumps(1)
    return b"Login successful" in stdout_output

def is_failed(state):
    stdout_output = state.posix.dumps(1)
    return b"Login failed" in stdout_output

# 加載要分析的程式
project = angr.Project("./login", auto_load_libs=False)

# 設定初始狀態
initial_state = project.factory.entry_state()

# 設定符號化的標準輸入，長度為16
password = claripy.BVS("password", 8 * 16)
initial_state.posix.stdin.write(password)
initial_state.posix.stdin.seek(0)

# 創建模擬管理器
simulation_manager = project.factory.simulation_manager(initial_state)

# 探索，找到成功的輸出並避開失敗的輸出
simulation_manager.explore(find=is_successful, avoid=is_failed)

# 確認是否找到解決方案
if simulation_manager.found:
    solution_state = simulation_manager.found[0]
    solution = solution_state.solver.eval(password, cast_to=bytes).decode('utf-8')
    print(f"找到的密碼是: {solution}")
else:
    print("沒有找到有效的密碼")
