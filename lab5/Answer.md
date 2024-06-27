# Answer

Name: 張詠欽
ID: 512558007

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     √      |   √    |
| Stack out-of-bounds  |     √      |   √    |
| Global out-of-bounds |     X      |   √    |
| Use-after-free       |     √      |   √    |
| Use-after-return     |     √      |   √    |

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
#include <stdio.h>

void riskyFunction() {
    int stackArray[5];

    // 初始化陣列
    for (int i = 0; i < 5; i++) {
        stackArray[i] = i;
    }

    // 進行越界寫入
    stackArray[10] = 10;

}

int main() {
    riskyFunction();
    return 0;
}

```
#### Valgrind Report
```
==3408== Memcheck, a memory error detector
==3408== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3408== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==3408== Command: ./low
==3408== 
==3408== Jump to the invalid address stated on the next line
==3408==    at 0xA: ???
==3408==    by 0x48941C9: (below main) (libc_start_call_main.h:58)
==3408==  Address 0xa is not stack'd, malloc'd or (recently) free'd
==3408== 
==3408== 
==3408== Process terminating with default action of signal 11 (SIGSEGV)
==3408==  Bad permissions for mapped region at address 0xA
==3408==    at 0xA: ???
==3408==    by 0x48941C9: (below main) (libc_start_call_main.h:58)
==3408== 
==3408== HEAP SUMMARY:
==3408==     in use at exit: 0 bytes in 0 blocks
==3408==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3408== 
==3408== All heap blocks were freed -- no leaks are possible
==3408== 
==3408== For lists of detected and suppressed errors, rerun with: -s
==3408== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==3428==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ec5a7d09048 at pc 0x5c61a96c530c bp 0x7fffcbd3dd60 sp 0x7fffcbd3dd50
WRITE of size 4 at 0x7ec5a7d09048 thread T0
    #0 0x5c61a96c530b in riskyFunction /home/giwawa/桌面/test/low.c:12
    #1 0x5c61a96c538a in main /home/giwawa/桌面/test/low.c:17
    #2 0x7ec5a9e2a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7ec5a9e2a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x5c61a96c5104 in _start (/home/giwawa/桌面/test/low+0x1104) (BuildId: 1ed8deb4dcfb7af49aad01920bb213f7a984d847)

Address 0x7ec5a7d09048 is located in stack of thread T0 at offset 72 in frame
    #0 0x5c61a96c51d8 in riskyFunction /home/giwawa/桌面/test/low.c:3

  This frame has 1 object(s):
    [32, 52) 'stackArray' (line 4) <== Memory access at offset 72 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/giwawa/桌面/test/low.c:12 in riskyFunction
Shadow bytes around the buggy address:
  0x7ec5a7d08d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d08e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d08e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d08f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d08f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7ec5a7d09000: f1 f1 f1 f1 00 00 04 f3 f3[f3]f3 f3 00 00 00 00
  0x7ec5a7d09080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d09100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d09180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d09200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ec5a7d09280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3428==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int globalArray[5];

void riskyFunction() {

    for (int i = 0; i < 5; i++) {
        globalArray[i] = i;
    }

    // 進行越界寫入
    globalArray[10] = 10;  

    // 進行越界讀取
    int value = globalArray[10];  
    // 這是未被正確分配的記憶體位置
}

int main() {
    riskyFunction();
    return 0;
}

```
#### Valgrind Report
```
==4950== Memcheck, a memory error detector
==4950== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==4950== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==4950== Command: ./low
==4950== 
==4950== 
==4950== HEAP SUMMARY:
==4950==     in use at exit: 0 bytes in 0 blocks
==4950==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==4950== 
==4950== All heap blocks were freed -- no leaks are possible
==4950== 
==4950== For lists of detected and suppressed errors, rerun with: -s
==4950== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==5028==ERROR: AddressSanitizer: global-buffer-overflow on address 0x61abc1db40c8 at pc 0x61abc1db127e bp 0x7fff00f5d460 sp 0x7fff00f5d450
WRITE of size 4 at 0x61abc1db40c8 thread T0
    #0 0x61abc1db127d in riskyFunction (/home/giwawa/桌面/test/low+0x127d) (BuildId: e5e8b0ecf7b5df42b055ab02ddfdc7892fe3f29b)
    #1 0x61abc1db12a5 in main (/home/giwawa/桌面/test/low+0x12a5) (BuildId: e5e8b0ecf7b5df42b055ab02ddfdc7892fe3f29b)
    #2 0x7ef6fb22a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7ef6fb22a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x61abc1db1104 in _start (/home/giwawa/桌面/test/low+0x1104) (BuildId: e5e8b0ecf7b5df42b055ab02ddfdc7892fe3f29b)

0x61abc1db40c8 is located 20 bytes after global variable 'globalArray' defined in 'low.c:3:5' (0x61abc1db40a0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/giwawa/桌面/test/low+0x127d) (BuildId: e5e8b0ecf7b5df42b055ab02ddfdc7892fe3f29b) in riskyFunction
Shadow bytes around the buggy address:
  0x61abc1db3e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db3e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db3f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db3f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db4000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x61abc1db4080: 00 00 00 00 00 00 04 f9 f9[f9]f9 f9 00 00 00 00
  0x61abc1db4100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db4180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db4200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db4280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x61abc1db4300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==5028==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

void riskyFunction() {
    // 動態分配記憶體
    int* ptr = (int*)malloc(sizeof(int) * 5);

    // 初始化分配的記憶體
    for (int i = 0; i < 5; i++) {
        ptr[i] = i;
    }

    // 釋放分配的記憶體
    free(ptr);

    // 在釋放後使用該記憶體
    int value = ptr[2];  
    // 這是釋放後使用（Use-after-free）的錯誤
}

int main() {
    riskyFunction();
    return 0;
}
```
#### Valgrind Report
```
==5051== Memcheck, a memory error detector
==5051== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==5051== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==5051== Command: ./low
==5051== 
==5051== Invalid read of size 4
==5051==    at 0x1091DF: riskyFunction (in /home/giwawa/桌面/test/low)
==5051==    by 0x109212: main (in /home/giwawa/桌面/test/low)
==5051==  Address 0x4a7f048 is 8 bytes inside a block of size 20 free'd
==5051==    at 0x484988F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5051==    by 0x1091DA: riskyFunction (in /home/giwawa/桌面/test/low)
==5051==    by 0x109212: main (in /home/giwawa/桌面/test/low)
==5051==  Block was alloc'd at
==5051==    at 0x4846828: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5051==    by 0x10919E: riskyFunction (in /home/giwawa/桌面/test/low)
==5051==    by 0x109212: main (in /home/giwawa/桌面/test/low)
==5051== 
Value: 2
==5051== 
==5051== HEAP SUMMARY:
==5051==     in use at exit: 0 bytes in 0 blocks
==5051==   total heap usage: 2 allocs, 2 frees, 1,044 bytes allocated
==5051== 
==5051== All heap blocks were freed -- no leaks are possible
==5051== 
==5051== For lists of detected and suppressed errors, rerun with: -s
==5051== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==5077==ERROR: AddressSanitizer: heap-use-after-free on address 0x503000000048 at pc 0x618e952a530e bp 0x7ffcd87640f0 sp 0x7ffcd87640e0
READ of size 4 at 0x503000000048 thread T0
    #0 0x618e952a530d in riskyFunction (/home/giwawa/桌面/test/low+0x130d) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)
    #1 0x618e952a5345 in main (/home/giwawa/桌面/test/low+0x1345) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)
    #2 0x7feca7a2a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7feca7a2a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x618e952a5184 in _start (/home/giwawa/桌面/test/low+0x1184) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)

0x503000000048 is located 8 bytes inside of 20-byte region [0x503000000040,0x503000000054)
freed by thread T0 here:
    #0 0x7feca7efa678 in free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x618e952a52d2 in riskyFunction (/home/giwawa/桌面/test/low+0x12d2) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)
    #2 0x618e952a5345 in main (/home/giwawa/桌面/test/low+0x1345) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)
    #3 0x7feca7a2a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #4 0x7feca7a2a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #5 0x618e952a5184 in _start (/home/giwawa/桌面/test/low+0x1184) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)

previously allocated by thread T0 here:
    #0 0x7feca7efbb37 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x618e952a525e in riskyFunction (/home/giwawa/桌面/test/low+0x125e) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)
    #2 0x618e952a5345 in main (/home/giwawa/桌面/test/low+0x1345) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)
    #3 0x7feca7a2a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #4 0x7feca7a2a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #5 0x618e952a5184 in _start (/home/giwawa/桌面/test/low+0x1184) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342)

SUMMARY: AddressSanitizer: heap-use-after-free (/home/giwawa/桌面/test/low+0x130d) (BuildId: 8eefd7c85c2844187ce166d82a54a88e7c6a4342) in riskyFunction
Shadow bytes around the buggy address:
  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x503000000000: fa fa 00 00 00 fa fa fa fd[fd]fd fa fa fa fa fa
  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==5077==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int* getPointerToDynamicMemory() {
    // 動態分配整數的記憶體
    int* dynamicVar = (int*)malloc(sizeof(int));
    *dynamicVar = 42;
    return dynamicVar;  
    // 返回指向動態分配內存的指針
}

void useAfterReturn() {
    // 獲取指向動態分配內存的指針
    int* ptr = getPointerToDynamicMemory();
    // 釋放內存
    free(ptr);
    // 嘗試在釋放後使用該指針
    printf("Value: %d\n", *ptr);  // 這是會引發 Use-after-return 的錯誤
}

int main() {
    useAfterReturn();
    return 0;
}
```
#### Valgrind Report
```
==3456== Memcheck, a memory error detector
==3456== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3456== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==3456== Command: ./low
==3456== 
==3456== Invalid read of size 4
==3456==    at 0x1091DD: useAfterReturn (in /home/giwawa/桌面/test/low)
==3456==    by 0x109209: main (in /home/giwawa/桌面/test/low)
==3456==  Address 0x4a7f040 is 0 bytes inside a block of size 4 free'd
==3456==    at 0x484988F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3456==    by 0x1091D8: useAfterReturn (in /home/giwawa/桌面/test/low)
==3456==    by 0x109209: main (in /home/giwawa/桌面/test/low)
==3456==  Block was alloc'd at
==3456==    at 0x4846828: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3456==    by 0x10919E: getPointerToDynamicMemory (in /home/giwawa/桌面/test/low)
==3456==    by 0x1091C8: useAfterReturn (in /home/giwawa/桌面/test/low)
==3456==    by 0x109209: main (in /home/giwawa/桌面/test/low)
==3456== 
Value: 42
==3456== 
==3456== HEAP SUMMARY:
==3456==     in use at exit: 0 bytes in 0 blocks
==3456==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==3456== 
==3456== All heap blocks were freed -- no leaks are possible
==3456== 
==3456== For lists of detected and suppressed errors, rerun with: -s
==3456== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3484==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x560b98199307 bp 0x7fffcd8903b0 sp 0x7fffcd8903a0
READ of size 4 at 0x502000000010 thread T0
    #0 0x560b98199306 in useAfterReturn /home/giwawa/桌面/test/low.c:18
    #1 0x560b98199337 in main /home/giwawa/桌面/test/low.c:22
    #2 0x7bc4ff82a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7bc4ff82a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #4 0x560b98199184 in _start (/home/giwawa/桌面/test/low+0x1184) (BuildId: 0d44362972d3c45404c50e8bce0948244ffc6995)

0x502000000010 is located 0 bytes inside of 4-byte region [0x502000000010,0x502000000014)
freed by thread T0 here:
    #0 0x7bc4ffcfa678 in free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x560b981992cf in useAfterReturn /home/giwawa/桌面/test/low.c:16
    #2 0x560b98199337 in main /home/giwawa/桌面/test/low.c:22
    #3 0x7bc4ff82a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #4 0x7bc4ff82a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #5 0x560b98199184 in _start (/home/giwawa/桌面/test/low+0x1184) (BuildId: 0d44362972d3c45404c50e8bce0948244ffc6995)

previously allocated by thread T0 here:
    #0 0x7bc4ffcfbb37 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x560b9819925e in getPointerToDynamicMemory /home/giwawa/桌面/test/low.c:6
    #2 0x560b981992bf in useAfterReturn /home/giwawa/桌面/test/low.c:14
    #3 0x560b98199337 in main /home/giwawa/桌面/test/low.c:22
    #4 0x7bc4ff82a1c9 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #5 0x7bc4ff82a28a in __libc_start_main_impl ../csu/libc-start.c:360
    #6 0x560b98199184 in _start (/home/giwawa/桌面/test/low+0x1184) (BuildId: 0d44362972d3c45404c50e8bce0948244ffc6995)

SUMMARY: AddressSanitizer: heap-use-after-free /home/giwawa/桌面/test/low.c:18 in useAfterReturn
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==3484==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[8];
    int b[8];

    for (int i = 0; i < 8; i++) {
        a[i] = i;
        b[i] = i + 10;
    }

    // 輸出陣列 b 的初始值
    printf("Array b before out-of-bounds write:\n");
    for (int i = 0; i < 8; i++) {
        printf("b[%d] = %d\n", i, b[i]);
    }

    // 在 a 陣列的邊界上進行越界寫入
    a[8] = 100;  
    // 這將寫入到 a[8]，實際上這是在 b 的 redzone 中

    // 輸出陣列 b 的值以檢查影響
    printf("Array b after out-of-bounds write:\n");
    for (int i = 0; i < 8; i++) {
        printf("b[%d] = %d\n", i, b[i]);
    }

    return 0;
}
```
### Why
當 ptr 試圖寫入超出 a 陣列範圍並影響 b 陣列時，ASan 會檢測到這個違規操作並報告錯誤。

