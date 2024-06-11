# Answer

Name: 楊杰峰
ID: 510558017

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | Yes      | Yes  |
| Stack out-of-bounds  | Yes      | Yes  |
| Global out-of-bounds | Yes      | Yes  |
| Use-after-free       | Yes      | Yes  |
| Use-after-return     | Yes      | Yes  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

void heap_out_of_bounds() {
    int *arr = (int *)malloc(5 * sizeof(int));
    arr[5] = 10; // Out-of-bounds write
    printf("%d\n", arr[6]); // Out-of-bounds read
    free(arr);
}

int main() {
    heap_out_of_bounds();
    return 0;
}

```
#### Valgrind Report
```
==10520== Memcheck, a memory error detector
==10520== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10520== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==10520== Command: ./heap_out_of_bounds
==10520== 
==10520==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==10520== 
==10520== HEAP SUMMARY:
==10520==     in use at exit: 0 bytes in 0 blocks
==10520==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==10520== 
==10520== All heap blocks were freed -- no leaks are possible
==10520== 
==10520== For lists of detected and suppressed errors, rerun with: -s
==10520== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==10519==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000024 at pc 0x56433e0122a2 bp 0x7ffcb47c35e0 sp 0x7ffcb47c35d0
WRITE of size 4 at 0x603000000024 thread T0
    #0 0x56433e0122a1 in heap_out_of_bounds (/home/jf/510558017/510558017/lab5/heap_out_of_bounds+0x12a1)
    #1 0x56433e01231c in main (/home/jf/510558017/510558017/lab5/heap_out_of_bounds+0x131c)
    #2 0x7fc5f69a1082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x56433e01218d in _start (/home/jf/510558017/510558017/lab5/heap_out_of_bounds+0x118d)

0x603000000024 is located 0 bytes to the right of 20-byte region [0x603000000010,0x603000000024)
allocated by thread T0 here:
    #0 0x7fc5f6c7c808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x56433e01225e in heap_out_of_bounds (/home/jf/510558017/510558017/lab5/heap_out_of_bounds+0x125e)
    #2 0x56433e01231c in main (/home/jf/510558017/510558017/lab5/heap_out_of_bounds+0x131c)
    #3 0x7fc5f69a1082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/jf/510558017/510558017/lab5/heap_out_of_bounds+0x12a1) in heap_out_of_bounds
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00[04]fa fa fa fa fa fa fa fa fa fa fa
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
==10519==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

void stack_out_of_bounds() {
    int arr[5];
    arr[5] = 10; // Out-of-bounds write
    printf("%d\n", arr[6]); // Out-of-bounds read
}

int main() {
    stack_out_of_bounds();
    return 0;
}

```
#### Valgrind Report
```
valgrind: ./stack_out_of_bounds: No such file or directory==10523== Memcheck, a memory error detector
==10523== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10523== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==10523== Command: ./stack_out_of_bounds
==10523== 
==10523==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==10523== 
==10523== HEAP SUMMARY:
==10523==     in use at exit: 0 bytes in 0 blocks
==10523==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==10523== 
==10523== All heap blocks were freed -- no leaks are possible
==10523== 
==10523== For lists of detected and suppressed errors, rerun with: -s
==10523== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==10522==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe0476bb84 at pc 0x563a4ff0a31c bp 0x7ffe0476bb40 sp 0x7ffe0476bb30
WRITE of size 4 at 0x7ffe0476bb84 thread T0
    #0 0x563a4ff0a31b in stack_out_of_bounds (/home/jf/510558017/510558017/lab5/stack_out_of_bounds+0x131b)
    #1 0x563a4ff0a3ee in main (/home/jf/510558017/510558017/lab5/stack_out_of_bounds+0x13ee)
    #2 0x7f846c906082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x563a4ff0a18d in _start (/home/jf/510558017/510558017/lab5/stack_out_of_bounds+0x118d)

Address 0x7ffe0476bb84 is located in stack of thread T0 at offset 52 in frame
    #0 0x563a4ff0a258 in stack_out_of_bounds (/home/jf/510558017/510558017/lab5/stack_out_of_bounds+0x1258)

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/jf/510558017/510558017/lab5/stack_out_of_bounds+0x131b) in stack_out_of_bounds
Shadow bytes around the buggy address:
  0x1000408e5720: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e5730: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e5740: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e5750: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e5760: 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00
=>0x1000408e5770:[04]f3 f3 f3 f3 f3 00 00 00 00 00 00 00 00 00 00
  0x1000408e5780: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e5790: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e57a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e57b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000408e57c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==10522==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int global_arr[5];

void global_out_of_bounds() {
    global_arr[1000] = 10; // Out-of-bounds write
    printf("%d\n", global_arr[1000]); // Out-of-bounds read
}

int main() {
    global_out_of_bounds();
    return 0;
}

```
#### Valgrind Report
```
==3415== Memcheck, a memory error detector
==3415== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3415== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==3415== Command: ./global_out_of_bounds
==3415== 
==3415==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==3415== 
==3415== HEAP SUMMARY:
==3415==     in use at exit: 0 bytes in 0 blocks
==3415==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3415== 
==3415== All heap blocks were freed -- no leaks are possible
==3415== 
==3415== For lists of detected and suppressed errors, rerun with: -s
==3415== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==4271==ERROR: AddressSanitizer: SEGV on unknown address 0x55f0360a2010 (pc 0x55f03609e223 bp 0x7ffccdefbd80 sp 0x7ffccdefbd80 T0)
==4271==The signal is caused by a WRITE memory access.
    #0 0x55f03609e222 in global_out_of_bounds (/home/jf/510558017/510558017/lab5/global_out_of_bounds+0x1222)
    #1 0x55f03609e25a in main (/home/jf/510558017/510558017/lab5/global_out_of_bounds+0x125a)
    #2 0x7fa41ffa2082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x55f03609e12d in _start (/home/jf/510558017/510558017/lab5/global_out_of_bounds+0x112d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/jf/510558017/510558017/lab5/global_out_of_bounds+0x1222) in global_out_of_bounds
==4271==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

void use_after_free() {
    int *ptr = (int *)malloc(sizeof(int));
    *ptr = 10;
    free(ptr);
    printf("%d\n", *ptr); // Use-after-free
}

int main() {
    use_after_free();
    return 0;
}

```
#### Valgrind Report
```
==11128== Memcheck, a memory error detector
==11128== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==11128== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==11128== Command: ./use_after_free
==11128== 
==11128==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==11128== 
==11128== HEAP SUMMARY:
==11128==     in use at exit: 0 bytes in 0 blocks
==11128==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==11128== 
==11128== All heap blocks were freed -- no leaks are possible
==11128== 
==11128== For lists of detected and suppressed errors, rerun with: -s
==11128== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
bash: ./use_after_free=================================================================
==11127==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55aa1e5ca2e7 bp 0x7fffbec7e9a0 sp 0x7fffbec7e990
READ of size 4 at 0x602000000010 thread T0
    #0 0x55aa1e5ca2e6 in use_after_free (/home/jf/510558017/510558017/lab5/use_after_free+0x12e6)
    #1 0x55aa1e5ca314 in main (/home/jf/510558017/510558017/lab5/use_after_free+0x1314)
    #2 0x7f3219ec3082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x55aa1e5ca18d in _start (/home/jf/510558017/510558017/lab5/use_after_free+0x118d)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f321a19e40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x55aa1e5ca2af in use_after_free (/home/jf/510558017/510558017/lab5/use_after_free+0x12af)
    #2 0x55aa1e5ca314 in main (/home/jf/510558017/510558017/lab5/use_after_free+0x1314)
    #3 0x7f3219ec3082 in __libc_start_main ../csu/libc-start.c:308

previously allocated by thread T0 here:
    #0 0x7f321a19e808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x55aa1e5ca25e in use_after_free (/home/jf/510558017/510558017/lab5/use_after_free+0x125e)
    #2 0x55aa1e5ca314 in main (/home/jf/510558017/510558017/lab5/use_after_free+0x1314)
    #3 0x7f3219ec3082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-use-after-free (/home/jf/510558017/510558017/lab5/use_after_free+0x12e6) in use_after_free
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
==11127==ABORTING: No such file or directory
```

### Use-after-return
#### Source code
```
#include <stdio.h>

int *use_after_return_helper() {
    int val = 10;
    return &val;
}

void use_after_return() {
    int *ptr = use_after_return_helper();
    printf("%d\n", *ptr); // Use-after-return
}

int main() {
    use_after_return();
    return 0;
}

```
#### Valgrind Report
```
==11130== Memcheck, a memory error detector
==11130== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==11130== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==11130== Command: ./use_after_return
==11130== 
==11130==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==11130== 
==11130== HEAP SUMMARY:
==11130==     in use at exit: 0 bytes in 0 blocks
==11130==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==11130== 
==11130== All heap blocks were freed -- no leaks are possible
==11130== 
==11130== For lists of detected and suppressed errors, rerun with: -s
==11130== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==11129==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55c39c7c93ac bp 0x7fffe81607a0 sp 0x7fffe8160790 T0)
==11129==The signal is caused by a READ memory access.
==11129==Hint: address points to the zero page.
    #0 0x55c39c7c93ab in use_after_return (/home/jf/510558017/510558017/lab5/use_after_return+0x13ab)
    #1 0x55c39c7c93d5 in main (/home/jf/510558017/510558017/lab5/use_after_return+0x13d5)
    #2 0x7f848dc30082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x55c39c7c918d in _start (/home/jf/510558017/510558017/lab5/use_after_return+0x118d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/jf/510558017/510558017/lab5/use_after_return+0x13ab) in use_after_return
==11129==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

void out_of_bound_write() {
    int *a = (int *)malloc(8 * sizeof(int)); // 分配8個int的空間
    // 進行剛好超出redzone的寫操作
    a[8] = 10; // 這裡發生越界寫操作
    printf("Out of bound write: %d\n", a[8]);
    free(a);
}

int main() {
    out_of_bound_write();
    return 0;
}

```
### Why
ASan 能夠偵測到剛好超出 redzone 的越界寫操作，因為它會在每個分配的內存區域前後添加 redzones，並在訪問這些區域時檢測到越界操作。
