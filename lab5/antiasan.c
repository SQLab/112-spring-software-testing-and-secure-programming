// TODO:
void antiasan(unsigned long addr)
{
#include <stddef.h>
#include <stdint.h>

   *(volatile char *)(addr >> 3 + 0x7fff8000) = 0;
}
