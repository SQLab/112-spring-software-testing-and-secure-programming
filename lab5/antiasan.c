#include <sanitizer/asan_interface.h>
#include <stdlib.h>

void antiasan(unsigned long addr) {
    // 將指定地址的記憶體區塊標記為已分配
    __asan_unpoison_memory_region((void *)addr, sizeof(int));
}
