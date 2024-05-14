// TODO:
void antiasan(unsigned long addr) {
    unsigned long shadowAddress;
    char *shadowByte;

    shadowAddress = (addr >> 3) + 0x7fff8000;
    shadowByte = (char *)shadowAddress;
    *shadowByte = 0;
}
