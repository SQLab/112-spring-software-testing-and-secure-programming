// TODO:
void antiasan(unsigned long addr) {
    // 將地址右移 3 位，相當於除以 8，以便計算對應的 shadow memory 地址
    unsigned long shadow_addr = (addr >> 3) + 0x7fff8000;

    // 將 shadow memory 地址對應的位元組設置為 0，這樣 ASan 就無法檢測到對應地址的寫入
    *(char *)shadow_addr = 0;
}
