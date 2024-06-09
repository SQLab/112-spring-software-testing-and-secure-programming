import angr
import sys

def main():
    # 載入要分析的程式 './login'
    project = angr.Project('./login')
    
    # 創建初始狀態
    initial_state = project.factory.entry_state()
    
    # 創建模擬執行管理器
    simulation_manager = project.factory.simgr(initial_state)

    def is_successful(state):
        # 取得標準輸出的內容
        stdout_output = state.posix.dumps(sys.stdout.fileno())
        # 檢查是否包含 "Login successful" 字串
        return "Login successful" in stdout_output.decode()

    # 進行符號執行，尋找成功狀態
    simulation_manager.explore(find=is_successful, depth=100)

    if simulation_manager.found:
        # 如果找到了成功狀態
        solution_state = simulation_manager.found[0]
        # 取得標準輸入的內容，即為密碼
        password = solution_state.posix.dumps(sys.stdin.fileno())
        # 將密碼解碼為字串並輸出
        print(password.decode())
    else:
        # 如果沒有找到成功狀態，輸出未找到密碼的提示
        print("無法找到密碼")

if __name__ == '__main__':
    main()