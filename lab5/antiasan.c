// TODO:
#include "antiasan.h"
#include <stdio.h>
#include <sanitizer/asan_interface.h>

void antiasan(unsigned long addr)
{
    // Debug output to trace the unpoisoning process
    printf("Debug: Unpoisoning memory at address %p\n", (void *)addr);

    // Call the ASan API to unpoison the memory region
    __asan_unpoison_memory_region((void *)addr, sizeof(char));

    // Optionally set the memory to a specific value
    *(char *)addr = 'H';  // Setting the memory explicitly to 'H'
    printf("Debug: Memory at address %p set to %c\n", (void *)addr, *(char *)addr);

    // Note: We are not re-poisoning the memory here to avoid use-after-poison errors

