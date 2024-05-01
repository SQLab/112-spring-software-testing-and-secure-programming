#include <stddef.h>
#include <stdint.h>   

void antiasan(unsigned long addr) {
    const uintptr_t MemoryBase = 0x7fff8000;
    uintptr_t shadow_addr = (addr >> 3) + MemoryBase;
    volatile char *shadow_mem = (volatile char *)shadow_addr;
    *shadow_mem = 0;
}
