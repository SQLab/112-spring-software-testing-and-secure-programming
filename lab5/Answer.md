# Answer

Name: 杜佩珊
ID:512558002

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    V     |   V  |
| Stack out-of-bounds  |    V     |   V  |
| Global out-of-bounds |    V     |   V  |
| Use-after-free       |    V     |   V  |
| Use-after-return     |    V     |   V  |

### Heap out-of-bounds
#### Source code
#include <stdlib.h>
int main() {
    int* ptr = malloc(sizeof(int));
    *ptr = 42;
    
    // Heap out-of-bounds
    int* outOfBounds = ptr + 2;
    *outOfBounds = 21; // Writing past the allocated memory

    free(ptr);
    return 0;
}
#### Valgrind Report
==3424== Memcheck, a memory error detector
==3424== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3424== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==3424== Command: ./test
==3424== 
==3424== Invalid write of size 4
==3424==    at 0x10919D: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test)
==3424==  Address 0x4a50048 is 4 bytes after a block of size 4 alloc'd
==3424==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==3424==    by 0x10917E: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test)
==3424== 
==3424== 
==3424== HEAP SUMMARY:
==3424==     in use at exit: 0 bytes in 0 blocks
==3424==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==3424== 
==3424== All heap blocks were freed -- no leaks are possible
==3424== 
==3424== For lists of detected and suppressed errors, rerun with: -s
==3424== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
### ASan Report
=================================================================
==3521==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000018 at pc 0x56349427b267 bp 0x7fffa20e82f0 sp 0x7fffa20e82e0
WRITE of size 4 at 0x602000000018 thread T0
    #0 0x56349427b266 in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x1266)
    #1 0x7f92a7a95082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56349427b10d in _start (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x110d)

0x602000000018 is located 4 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x7f92a7d70808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x56349427b1de in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x11de)
    #2 0x7f92a7a95082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x1266) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 04[fa]fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
  Shadow gap:              cc
==3521==ABORTING
### Stack out-of-bounds
#### Source code
#include <stdio.h>

int main() {
    int arr[5];

    // Stack out-of-bounds
    arr[5] = 42; // Writing past the array bounds

    printf("Value: %d\n", arr[0]);
    return 0;
}
#### Valgrind Report
==3530== Memcheck, a memory error detector
==3530== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3530== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==3530== Command: ./test2
==3530== 
==3530== Conditional jump or move depends on uninitialised value(s)
==3530==    at 0x48D2958: __vfprintf_internal (vfprintf-internal.c:1687)
==3530==    by 0x48BCD3E: printf (printf.c:33)
==3530==    by 0x1091A0: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==3530== 
==3530== Use of uninitialised value of size 8
==3530==    at 0x48B669B: _itoa_word (_itoa.c:179)
==3530==    by 0x48D2574: __vfprintf_internal (vfprintf-internal.c:1687)
==3530==    by 0x48BCD3E: printf (printf.c:33)
==3530==    by 0x1091A0: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==3530== 
==3530== Conditional jump or move depends on uninitialised value(s)
==3530==    at 0x48B66AD: _itoa_word (_itoa.c:179)
==3530==    by 0x48D2574: __vfprintf_internal (vfprintf-internal.c:1687)
==3530==    by 0x48BCD3E: printf (printf.c:33)
==3530==    by 0x1091A0: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==3530== 
==3530== Conditional jump or move depends on uninitialised value(s)
==3530==    at 0x48D3228: __vfprintf_internal (vfprintf-internal.c:1687)
==3530==    by 0x48BCD3E: printf (printf.c:33)
==3530==    by 0x1091A0: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==3530== 
==3530== Conditional jump or move depends on uninitialised value(s)
==3530==    at 0x48D26EE: __vfprintf_internal (vfprintf-internal.c:1687)
==3530==    by 0x48BCD3E: printf (printf.c:33)
==3530==    by 0x1091A0: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==3530== 
Value: 0
==3530== 
==3530== HEAP SUMMARY:
==3530==     in use at exit: 0 bytes in 0 blocks
==3530==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==3530== 
==3530== All heap blocks were freed -- no leaks are possible
==3530== 
==3530== Use --track-origins=yes to see where uninitialised values come from
==3530== For lists of detected and suppressed errors, rerun with: -s
==3530== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
### ASan Report
=================================================================
==3538==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc60179894 at pc 0x559c0a96631c bp 0x7ffc60179850 sp 0x7ffc60179840
WRITE of size 4 at 0x7ffc60179894 thread T0
    #0 0x559c0a96631b in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x131b)
    #1 0x7ff2a0eae082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x559c0a96618d in _start (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x118d)

Address 0x7ffc60179894 is located in stack of thread T0 at offset 52 in frame
    #0 0x559c0a966258 in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x1258)

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x131b) in main
Shadow bytes around the buggy address:
  0x10000c0272c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000c0272d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000c0272e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00git
  0x10000c027300: 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1
=>0x10000c027310: 00 00[04]f3 f3 f3 f3 f3 00 00 00 00 00 00 00 00
  0x10000c027320: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000c027330: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000c027340: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000c027350: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000c027360: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
  Shadow gap:              cc
==3538==ABORTING
### Global out-of-bounds
#### Source code
#include <stdio.h>
#include <stdlib.h>

int globalArray[10]; 

void writeGlobalArray() {
    int *ptr = NULL;
    *ptr = 5; 
}

int main() {
    writeGlobalArray();
    printf("Out of bounds value: %d\n", globalArray[15]); // 在全局数组中越界读取
    return 0;
}


#### Valgrind Report
==7513== Memcheck, a memory error detector
==7513== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7513== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==7513== Command: ./test3
==7513== 
==7513== Invalid write of size 4
==7513==    at 0x10915D: writeGlobalArray (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==7513==    by 0x109177: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==7513==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==7513== 
==7513== 
==7513== Process terminating with default action of signal 11 (SIGSEGV)
==7513==  Access not within mapped region at address 0x0
==7513==    at 0x10915D: writeGlobalArray (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==7513==    by 0x109177: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==7513==  If you believe this happened as a result of a stack
==7513==  overflow in your program's main thread (unlikely but
==7513==  possible), you can try to increase the size of the
==7513==  main thread stack using the --main-stacksize= flag.
==7513==  The main thread stack size used in this run was 8388608.
==7513== 
==7513== HEAP SUMMARY:
==7513==     in use at exit: 0 bytes in 0 blocks
==7513==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==7513== 
==7513== All heap blocks were freed -- no leaks are possible
==7513== 
==7513== For lists of detected and suppressed errors, rerun with: -s
==7513== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
### ASan Report
AddressSanitizer:DEADLYSIGNAL
=================================================================
==7505==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5570d04f2258 bp 0x7ffdd50754c0 sp 0x7ffdd50754b0 T0)
==7505==The signal is caused by a WRITE memory access.
==7505==Hint: address points to the zero page.
    #0 0x5570d04f2257 in writeGlobalArray (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x1257)
    #1 0x5570d04f2272 in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x1272)
    #2 0x7fa462d57082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x5570d04f214d in _start (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x114d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x1257) in writeGlobalArray
==7505==ABORTING

### Use-after-free
#### Source code
#include <stdlib.h>
int main() {
    int* ptr = malloc(sizeof(int));
    *ptr = 42;

    free(ptr);

    // Use-after-free
    *ptr = 21; // Accessing freed memory

    return 0;
}
#### Valgrind Report
==3559== Memcheck, a memory error detector
==3559== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3559== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==3559== Command: ./test4
==3559== 
==3559== Invalid write of size 4
==3559==    at 0x10919D: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4)
==3559==  Address 0x4a50040 is 0 bytes inside a block of size 4 free'd
==3559==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==3559==    by 0x109198: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4)
==3559==  Block was alloc'd at
==3559==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==3559==    by 0x10917E: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4)
==3559== 
==3559== 
==3559== HEAP SUMMARY:
==3559==     in use at exit: 0 bytes in 0 blocks
==3559==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==3559== 
==3559== All heap blocks were freed -- no leaks are possible
==3559== 
==3559== For lists of detected and suppressed errors, rerun with: -s
==3559== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

### ASan Report
==3566==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55ecc4fac267 bp 0x7fffc1b288b0 sp 0x7fffc1b288a0
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x55ecc4fac266 in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x1266)
    #1 0x7fc91e292082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55ecc4fac10d in _start (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x110d)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7fc91e56d40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x55ecc4fac22f in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x122f)
    #2 0x7fc91e292082 in __libc_start_main ../csu/libc-start.c:308

previously allocated by thread T0 here:
    #0 0x7fc91e56d808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x55ecc4fac1de in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x11de)
    #2 0x7fc91e292082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-use-after-free (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x1266) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
  Shadow gap:              cc
==3566==ABORTING

### Use-after-return
#### Source code
#include <stdlib.h>
#include <stdio.h>
int* func() {
    int x = 42;
    return &x; // Returning a pointer to a local variable
}

int main() {
    int* ptr = func();

    // Use-after-return
    printf("Value: %d\n", *ptr); // Accessing memory after it was freed

    return 0;
}
#### Valgrind Report
==3572== Memcheck, a memory error detector
==3572== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3572== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==3572== Command: ./test5
==3572== 
==3572== Invalid read of size 4
==3572==    at 0x1091C4: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5)
==3572==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==3572== 
==3572== 
==3572== Process terminating with default action of signal 11 (SIGSEGV)
==3572==  Access not within mapped region at address 0x0
==3572==    at 0x1091C4: main (in /home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5)
==3572==  If you believe this happened as a result of a stack
==3572==  overflow in your program's main thread (unlikely but
==3572==  possible), you can try to increase the size of the
==3572==  main thread stack using the --main-stacksize= flag.
==3572==  The main thread stack size used in this run was 8388608.
==3572== 
==3572== HEAP SUMMARY:
==3572==     in use at exit: 0 bytes in 0 blocks
==3572==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3572== 
==3572== All heap blocks were freed -- no leaks are possible
==3572== 
==3572== For lists of detected and suppressed errors, rerun with: -s
==3572== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
### ASan Report
=================================================================
==3634==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55d9554643ac bp 0x7fffe1168d40 sp 0x7fffe1168d30 T0)
==3634==The signal is caused by a READ memory access.
==3634==Hint: address points to the zero page.
    #0 0x55d9554643ab in main (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5+0x13ab)
    #1 0x7f0aab51b082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55d95546418d in _start (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5+0x118d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/user/桌面/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5+0x13ab) in main
==3634==ABORTING

## ASan Out-of-bound Write bypass Redzone
### Source code
#include <stdio.h>
int main() {
  char a[8];
  char b[8];

  // 將 a[7] 指向 b[0]
  a[7] = b[0];

  // 將 a[7] 的值增加 32 byte
  a[7] += 32;
  return 0;
}

### Why
將a陣列的最後一個元素寫入了b陣列的第一個元素， 讓a+ 32 位元組剛好位於 b 陣列的邊界，因為沒有超過redzone，所以ASAN不會報告任何錯誤