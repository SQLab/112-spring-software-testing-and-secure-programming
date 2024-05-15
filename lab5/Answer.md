# Answer

Name: 張詠欽
ID: 512558007

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |          |      |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>
#include <string.h>

int main() {

    // 分配10個整數的記憶體空間
    int* array = (int*)malloc(10 * sizeof(int));
    
    // 寫超出範圍的記憶體
    for (int i = 0; i <= 10; i++) {       
    // 正確是 i < 10
        array[i] = i;
    }

    // 使用溢出的記憶體
    int value = array[10]; 
    // 讀取未被正確分配的記憶體位置

    free(array);
    // 釋放記憶體

    return 0;
```
#### Valgrind Report
```
=3525== Memcheck, a memory error detector
==3525== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3525== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==3525== Command: ./low
==3525== 
==3525== Invalid write of size 4
==3525==    at 0x1091A3: main (in /home/giwawa/桌面/test/low)
==3525==  Address 0x4a7f068 is 0 bytes after a block of size 40 alloc'd
==3525==    at 0x4846828: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3525==    by 0x10917E: main (in /home/giwawa/桌面/test/low)
==3525== 
==3525== Invalid read of size 4
==3525==    at 0x1091B3: main (in /home/giwawa/桌面/test/low)
==3525==  Address 0x4a7f068 is 0 bytes after a block of size 40 alloc'd
==3525==    at 0x4846828: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3525==    by 0x10917E: main (in /home/giwawa/桌面/test/low)
==3525== 
==3525== 
==3525== HEAP SUMMARY:
==3525==     in use at exit: 0 bytes in 0 blocks
==3525==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==3525== 
==3525== All heap blocks were freed -- no leaks are possible
==3525== 
==3525== For lists of detected and suppressed errors, rerun with: -s
==3525== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3595==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x504000000038 at pc 0x5cdb28c62220 bp 0x7ffe74a3e2f0 sp 0x7ffe74a3e2e0
WRITE of size 4 at 0x504000000038 thread T0
    #0 0x5cdb28c6221f in main /home/giwawa/桌面/test/low.c:10
    #1 0x7937c682a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7937c682a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5cdb28c62104 in _start (/home/giwawa/桌面/test/low_asan+0x1104) (BuildId: 1138fd7b2dbc544a1f8e9d6d5a38256aaffe5b19)

0x504000000038 is located 0 bytes after 40-byte region [0x504000000010,0x504000000038)
allocated by thread T0 here:
    #0 0x7937c6cfbb37 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5cdb28c621da in main /home/giwawa/桌面/test/low.c:6
    #2 0x7937c682a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5cdb28c62104 in _start (/home/giwawa/桌面/test/low_asan+0x1104) (BuildId: 1138fd7b2dbc544a1f8e9d6d5a38256aaffe5b19)

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/giwawa/桌面/test/low.c:10 in main
Shadow bytes around the buggy address:
  0x503ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x504000000000: fa fa 00 00 00 00 00[fa]fa fa fa fa fa fa fa fa
  0x504000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb

```

### Stack out-of-bounds
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Global out-of-bounds
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Use-after-free
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Use-after-return
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

```
### Why

