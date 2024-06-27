// TODO:
void antiasan(unsigned long addr) {
    unsigned long byte_addr = (addr >> 3) + 0x7fff8000;
    char *sbyte = (char *)byte_addr;
    *sbyte = 0;
}
