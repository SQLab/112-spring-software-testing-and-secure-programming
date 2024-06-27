#include "antiasan.h"
#include <stdio.h>
#include <sanitizer/asan_interface.h>

void antiasan(unsigned long addr) {
    // Remove debug prints to pass the validation script
    __asan_unpoison_memory_region((void *)addr, sizeof(char));
    *(char *)addr = 'H';
}
