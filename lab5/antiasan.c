// TODO:
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void antiasan(unsigned long addr)
{
    char *buffer = malloc(100);
    memset(buffer, 0, 200);  // 故意寫入超過分配的記憶體大小
    free(buffer);
}

int main() {
    antiasan(0);
    printf("Completed without ASan detection\n");
    return 0;
}
