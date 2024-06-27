# Answer

Name: 劉珈佑
ID: 511558020

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Yes   |  Yes |
| Stack out-of-bounds  |    No    |  No  |
| Global out-of-bounds |    No    |  No  |
| Use-after-free       |    Yes   |  No  |
| Use-after-return     |    Yes   |  No  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int) * 5);
    ptr[5] = 10;
    int x = ptr[-1]; 
    free(ptr);
    return 0;
}
```
#### Valgrind Report
```
==3903== Memcheck, a memory error detector
==3903== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3903== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3903== Command: ./Hoob
==3903== 
==3903== Invalid write of size 4
==3903==    at 0x10918B: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoob)
==3903==  Address 0x4a96054 is 0 bytes after a block of size 20 alloc'd
==3903==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3903==    by 0x10917E: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoob)
==3903== 
==3903== Invalid read of size 4
==3903==    at 0x109195: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoob)
==3903==  Address 0x4a9603c is 4 bytes before a block of size 20 alloc'd
==3903==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3903==    by 0x10917E: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoob)
==3903== 
==3903== 
==3903== HEAP SUMMARY:
==3903==     in use at exit: 0 bytes in 0 blocks
==3903==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==3903== 
==3903== All heap blocks were freed -- no leaks are possible
==3903== 
==3903== For lists of detected and suppressed errors, rerun with: -s
==3903== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3951==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x5ddb40b8e21f bp 0x7ffee89ed860 sp 0x7ffee89ed850
WRITE of size 4 at 0x603000000054 thread T0
    #0 0x5ddb40b8e21e in main /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoob.c:6
    #1 0x7f2a63429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f2a63429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ddb40b8e104 in _start (/home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoobasan+0x1104)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x7f2a638b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5ddb40b8e1da in main /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoob.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Hoob.c:6 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00[04]fa fa fa fa fa
  0x0c067fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==3951==ABORTING

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int arr[5];
    arr[5] = 10; // stack out-of-bounds write

    int val = arr[10]; // stack out-of-bounds read

    printf("%d\n", val); // to prevent optimization
    return 0;
}
```
#### Valgrind Report
```
==3978== Memcheck, a memory error detector
==3978== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3978== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3978== Command: ./Soob
==3978== 
76103056
==3978== 
==3978== HEAP SUMMARY:
==3978==     in use at exit: 0 bytes in 0 blocks
==3978==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==3978== 
==3978== All heap blocks were freed -- no leaks are possible
==3978== 
==3978== For lists of detected and suppressed errors, rerun with: -s
==3978== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==4026==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc74097d34 at pc 0x5646e2c2c37b bp 0x7ffc74097cf0 sp 0x7ffc74097ce0
WRITE of size 4 at 0x7ffc74097d34 thread T0
    #0 0x5646e2c2c37a in main /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Soob.c:5
    #1 0x7833a0c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7833a0c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5646e2c2c184 in _start (/home/liu123/112-spring-software-testing-and-secure-programming/lab5/Soobasan+0x1184)

Address 0x7ffc74097d34 is located in stack of thread T0 at offset 52 in frame
    #0 0x5646e2c2c258 in main /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Soob.c:3

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Soob.c:5 in main
Shadow bytes around the buggy address:
  0x10000e80af50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80af60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80af70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80af80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80af90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10000e80afa0: f1 f1 f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00 00 00
  0x10000e80afb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80afc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80afd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80afe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000e80aff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==4026==ABORTING

```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int arr[5];

int main() {
    arr[5] = 10; 
    int val = arr[10]; 

    printf("%d\n", val); 
    return 0;
}
```
#### Valgrind Report
```
==4168== Memcheck, a memory error detector
==4168== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4168== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4168== Command: ./Goob
==4168== 
0
==4168== 
==4168== HEAP SUMMARY:
==4168==     in use at exit: 0 bytes in 0 blocks
==4168==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==4168== 
==4168== All heap blocks were freed -- no leaks are possible
==4168== 
==4168== For lists of detected and suppressed errors, rerun with: -s
==4168== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==4177==ERROR: AddressSanitizer: global-buffer-overflow on address 0x57a5305430f4 at pc 0x57a530540289 bp 0x7ffd3f2b5530 sp 0x7ffd3f2b5520
WRITE of size 4 at 0x57a5305430f4 thread T0
    #0 0x57a530540288 in main /home/liu123/112-spring-software-testing-and-secure-programming/lab5/goob.c:6
    #1 0x7f828ec29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f828ec29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x57a530540144 in _start (/home/liu123/112-spring-software-testing-and-secure-programming/lab5/Goobasan+0x1144)

0x57a5305430f4 is located 0 bytes to the right of global variable 'arr' defined in 'goob.c:3:5' (0x57a5305430e0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/liu123/112-spring-software-testing-and-secure-programming/lab5/goob.c:6 in main
Shadow bytes around the buggy address:
  0x0af5260a05c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a05d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a05e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a05f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a0600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0af5260a0610: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00[04]f9
  0x0af5260a0620: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a0630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a0640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a0650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af5260a0660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==4177==ABORTING

```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    *ptr = 10;
    free(ptr);
    int x = *ptr; // Use-after-free
    return 0;
}
```
#### Valgrind Report
```
==4195== Memcheck, a memory error detector
==4195== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4195== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4195== Command: ./Uaf
==4195== 
==4195== Invalid read of size 4
==4195==    at 0x10919D: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uaf)
==4195==  Address 0x4a96040 is 0 bytes inside a block of size 4 free'd
==4195==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==4195==    by 0x109198: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uaf)
==4195==  Block was alloc'd at
==4195==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==4195==    by 0x10917E: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uaf)
==4195== 
==4195== 
==4195== HEAP SUMMARY:
==4195==     in use at exit: 0 bytes in 0 blocks
==4195==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==4195== 
==4195== All heap blocks were freed -- no leaks are possible
==4195== 
==4195== For lists of detected and suppressed errors, rerun with: -s
==4195== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
```

### Use-after-return
#### Source code
```
#include <stdio.h>

int *get_pointer() {
    int x = 10;
    int *ptr = &x; 
    return ptr; 
}

int main() {
    int *ptr = get_pointer();
    printf("%d\n", *ptr); 
    return 0;
}
```
#### Valgrind Report
```
==4290== Memcheck, a memory error detector
==4290== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4290== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4290== Command: ./Uar
==4290== 
==4290== Conditional jump or move depends on uninitialised value(s)
==4290==    at 0x48E0AD6: __vfprintf_internal (vfprintf-internal.c:1516)
==4290==    by 0x48CA79E: printf (printf.c:33)
==4290==    by 0x1091E2: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uar)
==4290== 
==4290== Use of uninitialised value of size 8
==4290==    at 0x48C42EB: _itoa_word (_itoa.c:177)
==4290==    by 0x48DFABD: __vfprintf_internal (vfprintf-internal.c:1516)
==4290==    by 0x48CA79E: printf (printf.c:33)
==4290==    by 0x1091E2: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uar)
==4290== 
==4290== Conditional jump or move depends on uninitialised value(s)
==4290==    at 0x48C42FC: _itoa_word (_itoa.c:177)
==4290==    by 0x48DFABD: __vfprintf_internal (vfprintf-internal.c:1516)
==4290==    by 0x48CA79E: printf (printf.c:33)
==4290==    by 0x1091E2: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uar)
==4290== 
==4290== Conditional jump or move depends on uninitialised value(s)
==4290==    at 0x48E05C3: __vfprintf_internal (vfprintf-internal.c:1516)
==4290==    by 0x48CA79E: printf (printf.c:33)
==4290==    by 0x1091E2: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uar)
==4290== 
==4290== Conditional jump or move depends on uninitialised value(s)
==4290==    at 0x48DFC05: __vfprintf_internal (vfprintf-internal.c:1516)
==4290==    by 0x48CA79E: printf (printf.c:33)
==4290==    by 0x1091E2: main (in /home/liu123/112-spring-software-testing-and-secure-programming/lab5/Uar)
==4290== 
10
==4290== 
==4290== HEAP SUMMARY:
==4290==     in use at exit: 0 bytes in 0 blocks
==4290==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==4290== 
==4290== All heap blocks were freed -- no leaks are possible
==4290== 
==4290== Use --track-origins=yes to see where uninitialised values come from
==4290== For lists of detected and suppressed errors, rerun with: -s
==4290== ERROR SUMMARY: 7 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <string.h>

int main() {
    char redzone1[32];
    int a[8];
    char redzone2[32];
    int b[8];
    char redzone3[32];

    memset(redzone1, 0xAA, sizeof(redzone1));
    memset(a, 0, sizeof(a));
    memset(redzone2, 0xBB, sizeof(redzone2));
    memset(b, 0, sizeof(b));
    memset(redzone3, 0xCC, sizeof(redzone3));

    for (int i = 0; i <= 8; i++) {
        b[i] = i;
    }

    for (int i = 0; i < sizeof(redzone1); i++) {
        if (redzone1[i] != 0xAA) {
            printf("redzone1 corrupted at index %d\n", i);
        }
    }

    for (int i = 0; i < sizeof(redzone2); i++) {
        if (redzone2[i] != 0xBB) {
            printf("redzone2 corrupted at index %d\n", i);
        }
    }

    for (int i = 0; i < sizeof(redzone3); i++) {
        if (redzone3[i] != 0xCC) {
            printf("redzone3 corrupted at index %d\n", i);
        }
    }

    return 0;
}
```
### Why
程式中定義了三個長度為 32 的字元陣列 redzone1、redzone2 和 redzone3,以及兩個長度為 8 的整數陣列 a 和 b。這些緩衝區被放置在記憶體中,中間相隔著 redzone。
首先使用 memset 函數初始化所有緩衝區,將它們設置為已知的值，之後有一個 for 迴圈,用於將值寫入 b 陣列。
但這裡迴圈條件是 i <= 8，最後一次迭代時超出了 b 的範圍,但剛好沒有觸及 redzone3。
最後檢查 redzone1、redzone2 和 redzone3 是否仍然保持完整,如果發現任何損壞,就輸出相應的警告消息。
### ASan Report
=================================================================
==4521==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd74f7d000 at pc 0x642902dff3bf bp 0x7ffd74f7cf70 sp 0x7ffd74f7cf60
WRITE of size 4 at 0x7ffd74f7d000 thread T0
    #0 0x642902dff3be in main /home/liu123/112-spring-software-testing-and-secure-programming/lab5/oobp.c:18
    #1 0x70b868429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x70b868429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x642902dff184 in _start (/home/liu123/112-spring-software-testing-and-secure-programming/lab5/oob+0x1184)

Address 0x7ffd74f7d000 is located in stack of thread T0 at offset 128 in frame
    #0 0x642902dff258 in main /home/liu123/112-spring-software-testing-and-secure-programming/lab5/oobp.c:4

  This frame has 5 object(s):
    [32, 64) 'a' (line 6)
    [96, 128) 'b' (line 8) <== Memory access at offset 128 overflows this variable
    [160, 192) 'redzone1' (line 5)
    [224, 256) 'redzone2' (line 7)
    [288, 320) 'redzone3' (line 9)
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/liu123/112-spring-software-testing-and-secure-programming/lab5/oobp.c:18 in main
Shadow bytes around the buggy address:
  0x10002e9e79b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e9e79c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e9e79d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e9e79e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e9e79f0: f1 f1 f1 f1 00 00 00 00 f2 f2 f2 f2 00 00 00 00
=>0x10002e9e7a00:[f2]f2 f2 f2 00 00 00 00 f2 f2 f2 f2 00 00 00 00
  0x10002e9e7a10: f2 f2 f2 f2 00 00 00 00 f3 f3 f3 f3 00 00 00 00
  0x10002e9e7a20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e9e7a30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e9e7a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e9e7a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==4521==ABORTING

報告中可以看到 ASan 成功檢測到了一個 heap-buffer-overflow 錯誤。它指出寫入操作發生在分配的緩衝區之外,雖然沒有真正觸及 redzone3,但仍被視為一個 Out-of-bounds Write。
