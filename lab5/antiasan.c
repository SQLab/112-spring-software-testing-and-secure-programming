// TODO:
#include <stddef.h>
#include <stdint.h>

void antiasan(unsigned long addr)
{
    *(volatile char *)(addr >> 3 + 0x7fff8000) = 0;
}
