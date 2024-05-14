// TODO:
void antiasan(unsigned long addr) {
    asm volatile("movq $0, %0" : "=m" (*(char *)addr));
}
