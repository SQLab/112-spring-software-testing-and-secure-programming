#include <stddef.h>
#include <stdint.h>

void antiasan(unsigned long addr) {
    const uintptr_t kAsanShadowMemoryBase = 0x7fff8000;
    uintptr_t shadow_addr = (addr >> 3) + kAsanShadowMemoryBase;
    volatile char *shadow_mem = (volatile char *)shadow_addr;
    *shadow_mem = 0;
}
