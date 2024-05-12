// TODO:
void antiasan(unsigned long addr)
{
#include <stdio.h>
#include <stdlib.h>

void antoasan(void *ptr, size_t size) {
    // This function attempts to bypass ASan detection
    // by casting the pointer to a different type and accessing the memory directly
    char *p = (char *)ptr;
    for (size_t i = 0; i < size; i++) {
        // Writing to the memory location pointed by 'ptr'
        // without triggering ASan detection
        p[i] = 'A'; // Replace 'A' with whatever value you desire
    }
}

int main() {
    int array[5];
    antoasan(array, sizeof(array)); // Attempt to bypass ASan detection
    printf("%d\n", array[5]); // Access out-of-bound memory

    return 0;
}
}
