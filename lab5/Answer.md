
# Answer
Name: 陳志名
ID:511558014
## Test Valgrind and ASan
### Result
```
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    V     |   V  |
| Stack out-of-bounds  |    V     |   V  |
| Global out-of-bounds |    V     |   V  |
| Use-after-free       |    V     |   V  |
| Use-after-return     |    V     |   V  |
```
### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

void heap_out_of_bounds() {
    int *ptr = (int *)malloc(3 * sizeof(int));
    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return;
    }

    ptr[3] = 10; // Heap out-of-bounds write

    free(ptr);
}

int main() {
    heap_out_of_bounds();

    return 0;
}
```
#### Valgrind Report
```
==2122== Memcheck, a memory error detector
==2122== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2122== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==2122== Command: ./test
==2122== 
==2122== Invalid write of size 4
==2122==    at 0x10919D: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test)
==2122==  Address 0x4a50048 is 4 bytes after a block of size 4 alloc'd
==2122==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==2122==    by 0x10917E: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test)
==2122== 
==2122== 
==2122== HEAP SUMMARY:
==2122==     in use at exit: 0 bytes in 0 blocks
==2122==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==2122== 
==2122== All heap blocks were freed -- no leaks are possible
==2122== 
==2122== For lists of detected and suppressed errors, rerun with: -s
==2122== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
### ASan Report
```
=================================================================
==3521==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000018 at pc 0x56349427b267 bp 0x7fffa20e82f0 sp 0x7fffa20e82e0
WRITE of size 4 at 0x602000000018 thread T0
    #0 0x56349427b266 in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x1266)
    #1 0x7f92a7a95082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56349427b10d in _start (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x110d)

0x602000000018 is located 4 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x7f92a7d70808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x56349427b1de in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x11de)
    #2 0x7f92a7a95082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test+0x1266) in main
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
```
### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() { int arr[8];

// Stack out-of-bounds
arr[8] = 57; 

printf("Value: %d\n", arr[0]);
return 0;
}
```
#### Valgrind Report
```
==4124== Memcheck, a memory error detector
==4124== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4124== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==4124== Command: ./test2
==4124== 
==4124== Conditional jump or move depends on uninitialised value(s)
==4124==    at 0x48D2958: __vfprintf_internal (vfprintf-internal.c:1687)
==4124==    by 0x48BCD3E: printf (printf.c:33)
==4124==    by 0x1091A0: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==4124== 
==4124== Use of uninitialised value of size 8
==4124==    at 0x48B669B: _itoa_word (_itoa.c:179)
==4124==    by 0x48D2574: __vfprintf_internal (vfprintf-internal.c:1687)
==4124==    by 0x48BCD3E: printf (printf.c:33)
==4124==    by 0x1091A0: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==4124== 
==4124== Conditional jump or move depends on uninitialised value(s)
==4124==    at 0x48B66AD: _itoa_word (_itoa.c:179)
==4124==    by 0x48D2574: __vfprintf_internal (vfprintf-internal.c:1687)
==4124==    by 0x48BCD3E: printf (printf.c:33)
==4124==    by 0x1091A0: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==4124== 
==4124== Conditional jump or move depends on uninitialised value(s)
==4124==    at 0x48D3228: __vfprintf_internal (vfprintf-internal.c:1687)
==4124==    by 0x48BCD3E: printf (printf.c:33)
==4124==    by 0x1091A0: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==4124== 
==4124== Conditional jump or move depends on uninitialised value(s)
==4124==    at 0x48D26EE: __vfprintf_internal (vfprintf-internal.c:1687)
==4124==    by 0x48BCD3E: printf (printf.c:33)
==4124==    by 0x1091A0: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2)
==4124== 
Value: 0
==4124== 
==4124== HEAP SUMMARY:
==4124==     in use at exit: 0 bytes in 0 blocks
==4124==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==4124== 
==4124== All heap blocks were freed -- no leaks are possible
==4124== 
==4124== Use --track-origins=yes to see where uninitialised values come from
==4124== For lists of detected and suppressed errors, rerun with: -s
==4124== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3538==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc60179894 at pc 0x559c0a96631c bp 0x7ffc60179850 sp 0x7ffc60179840
WRITE of size 4 at 0x7ffc60179894 thread T0
    #0 0x559c0a96631b in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x131b)
    #1 0x7ff2a0eae082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x559c0a96618d in _start (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x118d)

Address 0x7ffc60179894 is located in stack of thread T0 at offset 52 in frame
    #0 0x559c0a966258 in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x1258)

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test2+0x131b) in main
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
```
### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int *my_array;

void init_array() {
    my_array = (int*)malloc(5 * sizeof(int));
    if (my_array == NULL) {
        printf("Memory allocation failed\n");
        exit(1);
    }
    for (int i = 0; i < 5; i++) {
        my_array[i] = i + 1;
    }
}

void access_array(int index) {
    printf("Accessing element at index: %d\n", index);
    printf("Value at index %d: %d\n", index, my_array[index]);
}

int main() {
    init_array();

    access_array(6);
    
    free(my_array);

    return 0;
}
```
#### Valgrind Report
```
==8124== Memcheck, a memory error detector
==8124== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8124== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==8124== Command: ./test3
==8124== 
==8124== Invalid write of size 4
==8124==    at 0x10915D: writeGlobalArray (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==8124==    by 0x109177: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==8124==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==8124== 
==8124== 
==8124== Process terminating with default action of signal 11 (SIGSEGV)
==8124==  Access not within mapped region at address 0x0
==8124==    at 0x10915D: writeGlobalArray (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==8124==    by 0x109177: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3)
==8124==  If you believe this happened as a result of a stack
==8124==  overflow in your program's main thread (unlikely but
==8124==  possible), you can try to increase the size of the
==8124==  main thread stack using the --main-stacksize= flag.
==8124==  The main thread stack size used in this run was 8388608.
==8124== 
==8124== HEAP SUMMARY:
==8124==     in use at exit: 0 bytes in 0 blocks
==8124==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==8124== 
==8124== All heap blocks were freed -- no leaks are possible
==8124== 
==8124== For lists of detected and suppressed errors, rerun with: -s
==8124== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
AddressSanitizer:DEADLYSIGNAL
=================================================================
==7505==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5570d04f2258 bp 0x7ffdd50754c0 sp 0x7ffdd50754b0 T0)
==7505==The signal is caused by a WRITE memory access.
==7505==Hint: address points to the zero page.
    #0 0x5570d04f2257 in writeGlobalArray (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x1257)
    #1 0x5570d04f2272 in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x1272)
    #2 0x7fa462d57082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x5570d04f214d in _start (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x114d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test3+0x1257) in writeGlobalArray
==7505==ABORTING
```
### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>


int main() {
    int *array = malloc(8 * sizeof(int));
    free(array);
    array[0] = 0xff;
    return 0;
}
```
#### Valgrind Report
```
==7124== Memcheck, a memory error detector
==7124== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7124== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==7124== Command: ./test4
==7124== 
==7124== Invalid write of size 4
==7124==    at 0x10919D: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4)
==7124==  Address 0x4a50040 is 0 bytes inside a block of size 4 free'd
==7124==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==7124==    by 0x109198: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4)
==7124==  Block was alloc'd at
==7124==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==7124==    by 0x10917E: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4)
==7124== 
==7124== 
==7124== HEAP SUMMARY:
==7124==     in use at exit: 0 bytes in 0 blocks
==7124==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==7124== 
==7124== All heap blocks were freed -- no leaks are possible
==7124== 
==7124== For lists of detected and suppressed errors, rerun with: -s
==7124== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3566==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55ecc4fac267 bp 0x7fffc1b288b0 sp 0x7fffc1b288a0
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x55ecc4fac266 in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x1266)
    #1 0x7fc91e292082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55ecc4fac10d in _start (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x110d)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7fc91e56d40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x55ecc4fac22f in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x122f)
    #2 0x7fc91e292082 in __libc_start_main ../csu/libc-start.c:308

previously allocated by thread T0 here:
    #0 0x7fc91e56d808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x55ecc4fac1de in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x11de)
    #2 0x7fc91e292082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-use-after-free (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test4+0x1266) in main
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
```
### Use-after-return
#### Source code
```
int *return_pointer() {
    int value = 42;
    return &value;
}

int main() {
    int *ptr = return_pointer();
    printf("Value: %d\n", *ptr);
    printf("Value after return: %d\n", *ptr); 
    return 0;
}
```
#### Valgrind Report
```
==7522== Memcheck, a memory error detector
==7522== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7522== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==7522== Command: ./test5
==7522== 
==7522== Invalid read of size 4
==7522==    at 0x1091C4: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5)
==7522==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==7522== 
==7522== 
==7522== Process terminating with default action of signal 11 (SIGSEGV)
==7522==  Access not within mapped region at address 0x0
==7522==    at 0x1091C4: main (in /home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5)
==7522==  If you believe this happened as a result of a stack
==7522==  overflow in your program's main thread (unlikely but
==7522==  possible), you can try to increase the size of the
==7522==  main thread stack using the --main-stacksize= flag.
==7522==  The main thread stack size used in this run was 8388608.
==7522== 
==7522== HEAP SUMMARY:
==7522==     in use at exit: 0 bytes in 0 blocks
==7522==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==7522== 
==7522== All heap blocks were freed -- no leaks are possible
==7522== 
==7522== For lists of detected and suppressed errors, rerun with: -s
==7522== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8624==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55d9554643ac bp 0x7fffe1168d40 sp 0x7fffe1168d30 T0)
==8624==The signal is caused by a READ memory access.
==8624==Hint: address points to the zero page.
    #0 0x56d9454653ab in main (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5+0x13ab)
    #1 0x7f0aab51b082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55d95546418d in _start (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5+0x118d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/user/0430/github/112-spring-software-testing-and-secure-programming/lab5/testcode/test5+0x13ab) in main
==8624==ABORTING
```
## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h> 
#include <stdlib.h> 
int main()
{ 
int a[8]; 
int b[8]; 
a[16] = 0xff; 
return 0; 
}
```
### Why
將 a 陣列的最後一個元素放到 b 陣列的第一個位置上，而且 a 的後面再加 32 位元組剛好到達 b 的開始位置。因為這樣沒有超出內存保護區，所以ASAN不會檢測到任何問題。
