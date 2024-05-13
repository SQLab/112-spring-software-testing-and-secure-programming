//TODO:
#include <stddef.h>
#include <stdint.h>

void antiasan(unsigned long addr) {
  // 使用位運算直接計算 Shadow Memory 位址，
  // 避免額外的類型轉換和記憶體存取
  uintptr_t shadow_addr = (addr >> 3) | 0x7fff8000;
  // 使用原子操作寫入 Shadow Memory，
  // 確保寫入操作的原子性，避免競爭條件
  __atomic_store_n((char *)shadow_addr, 0, __ATOMIC_SEQ_CST);
}
