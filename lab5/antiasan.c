#include <stdint.h>

void antiasan(unsigned long addr)
{
    // Convert address to shadow memory address
    uintptr_t shadow_addr = (addr >> 3) + 0x7fff8000;

    // Mark shadow memory block as freed
    *(uintptr_t*)shadow_addr = 0;
}
