# Answer

Name:ChunYuChien
ID: 511558023

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Y     |  Y   |
| Stack out-of-bounds  |    X     |  Y   |
| Global out-of-bounds |    X     |  Y   |
| Use-after-free       |    Y     |  Y   |
| Use-after-return     |    Y     |  Y   |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int *heap = malloc(sizeof(int) * 3);
    memset(heap, 0, 3);
    printf("%d", heap[3]);
}
```
#### Valgrind Report
```
==21772== Memcheck, a memory error detector
==21772== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==21772== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==21772== Command: ./test_valgrind
==21772== 
==21772== Invalid write of size 1
==21772==    at 0x1091AB: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/test_valgrind)
==21772==  Address 0x4a97044 is 0 bytes after a block of size 4 alloc'd
==21772==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==21772==    by 0x10919E: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/test_valgrind)
==21772== 
==21772== Invalid read of size 1
==21772==    at 0x1091B6: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/test_valgrind)
==21772==  Address 0x4a97044 is 0 bytes after a block of size 4 alloc'd
==21772==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==21772==    by 0x10919E: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/test_valgrind)
==21772== 
a
==21772== 
==21772== HEAP SUMMARY:
==21772==     in use at exit: 0 bytes in 0 blocks
==21772==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==21772== 
==21772== All heap blocks were freed -- no leaks are possible
==21772== 
==21772== For lists of detected and suppressed errors, rerun with: -s
==21772== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==21946==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001c at pc 0x640458c7d295 bp 0x7ffedc7ee590 sp 0x7ffedc7ee580
READ of size 4 at 0x60200000001c thread T0
    #0 0x640458c7d294 in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:7
    #1 0x7adfab229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7adfab229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x640458c7d164 in _start (/home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf_asan+0x1164)

0x60200000001c is located 0 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7adfab6b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x640458c7d237 in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:7 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00[04]fa fa fa fa fa fa fa fa fa fa fa fa
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
==21946==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int stack[2];
    memset(stack, 0 , 2);
    printf("%d", stack[2]);
}
```
#### Valgrind Report
```
==21996== Memcheck, a memory error detector
==21996== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==21996== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==21996== Command: ./test_valgrind
==21996== 
109246208==21996== 
==21996== HEAP SUMMARY:
==21996==     in use at exit: 0 bytes in 0 blocks
==21996==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==21996== 
==21996== All heap blocks were freed -- no leaks are possible
==21996== 
==21996== For lists of detected and suppressed errors, rerun with: -s
==21996== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==22042==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffab3656b8 at pc 0x5ba376a8734d bp 0x7fffab365680 sp 0x7fffab365670
READ of size 4 at 0x7fffab3656b8 thread T0
    #0 0x5ba376a8734c in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:7
    #1 0x7fbb8e429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fbb8e429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ba376a87184 in _start (/home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf_asan+0x1184)

Address 0x7fffab3656b8 is located in stack of thread T0 at offset 40 in frame
    #0 0x5ba376a87258 in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:4

  This frame has 1 object(s):
    [32, 40) 'stack' (line 5) <== Memory access at offset 40 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:7 in main
Shadow bytes around the buggy address:
  0x100075664a80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664a90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664aa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664ab0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664ac0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100075664ad0: 00 00 f1 f1 f1 f1 00[f3]f3 f3 00 00 00 00 00 00
  0x100075664ae0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664af0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664b00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664b10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075664b20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==22042==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int gbl[2] = {1, 2};
int main() {
    printf("%d", gbl[2]);
}
```
#### Valgrind Report
```
==22077== Memcheck, a memory error detector
==22077== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==22077== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==22077== Command: ./test_valgrind
==22077== 
0==22077== 
==22077== HEAP SUMMARY:
==22077==     in use at exit: 0 bytes in 0 blocks
==22077==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==22077== 
==22077== All heap blocks were freed -- no leaks are possible
==22077== 
==22077== For lists of detected and suppressed errors, rerun with: -s
==22077== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==22106==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5b8164243028 at pc 0x5b8164240239 bp 0x7fffd6ab9520 sp 0x7fffd6ab9510
READ of size 4 at 0x5b8164243028 thread T0
    #0 0x5b8164240238 in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:6
    #1 0x7ad3bac29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ad3bac29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b8164240124 in _start (/home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf_asan+0x1124)

0x5b8164243028 is located 0 bytes to the right of global variable 'gbl' defined in 'uaf.c:4:5' (0x5b8164243020) of size 8
SUMMARY: AddressSanitizer: global-buffer-overflow /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:6 in main
Shadow bytes around the buggy address:
  0x0b70ac8405b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b70ac8405c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b70ac8405d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b70ac8405e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b70ac8405f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0b70ac840600: 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0b70ac840610: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0b70ac840620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b70ac840630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b70ac840640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b70ac840650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==22106==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int *heap = malloc(sizeof(int)*3);
    memset(heap, 0, 3);
    free(heap);
    printf("%d", heap[0]);
}
```
#### Valgrind Report
```
==22130== Memcheck, a memory error detector
==22130== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==22130== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==22130== Command: ./test_valgrind
==22130== 
==22130== Invalid read of size 4
==22130==    at 0x1091E9: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/test_valgrind)
==22130==  Address 0x4a97040 is 0 bytes inside a block of size 12 free'd
==22130==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==22130==    by 0x1091E4: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/test_valgrind)
==22130==  Block was alloc'd at
==22130==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==22130==    by 0x1091BE: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/test_valgrind)
==22130== 
0==22130== 
==22130== HEAP SUMMARY:
==22130==     in use at exit: 0 bytes in 0 blocks
==22130==   total heap usage: 2 allocs, 2 frees, 1,036 bytes allocated
==22130== 
==22130== All heap blocks were freed -- no leaks are possible
==22130== 
==22130== For lists of detected and suppressed errors, rerun with: -s
==22130== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==22144==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5bf8217b12bb bp 0x7ffd378eef20 sp 0x7ffd378eef10
READ of size 4 at 0x602000000010 thread T0
    #0 0x5bf8217b12ba in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:8
    #1 0x7a7deaa29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7a7deaa29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5bf8217b1184 in _start (/home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf_asan+0x1184)

0x602000000010 is located 0 bytes inside of 12-byte region [0x602000000010,0x60200000001c)
freed by thread T0 here:
    #0 0x7a7deaeb4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5bf8217b1274 in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:7

previously allocated by thread T0 here:
    #0 0x7a7deaeb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5bf8217b1257 in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:8 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fd fa fa fa fa fa fa fa fa fa fa fa fa
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
==22144==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int* glb;
void user_after_return() {
    int buf = 3;
    glb = &buf;
    return;
}

int main() {
    user_after_return();
    printf("%d", *glb);
    return 0;
}
```
#### Valgrind Report
```
==22182== Memcheck, a memory error detector
==22182== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==22182== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==22182== Command: ./test_valgrind
==22182== 
==22182== Conditional jump or move depends on uninitialised value(s)
==22182==    at 0x48E1AD6: __vfprintf_internal (vfprintf-internal.c:1516)
==22182==    by 0x48CB79E: printf (printf.c:33)
==22182==    by 0x1091DD: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/test_valgrind)
==22182== 
==22182== Use of uninitialised value of size 8
==22182==    at 0x48C52EB: _itoa_word (_itoa.c:177)
==22182==    by 0x48E0ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==22182==    by 0x48CB79E: printf (printf.c:33)
==22182==    by 0x1091DD: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/test_valgrind)
==22182== 
==22182== Conditional jump or move depends on uninitialised value(s)
==22182==    at 0x48C52FC: _itoa_word (_itoa.c:177)
==22182==    by 0x48E0ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==22182==    by 0x48CB79E: printf (printf.c:33)
==22182==    by 0x1091DD: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/test_valgrind)
==22182== 
==22182== Conditional jump or move depends on uninitialised value(s)
==22182==    at 0x48E15C3: __vfprintf_internal (vfprintf-internal.c:1516)
==22182==    by 0x48CB79E: printf (printf.c:33)
==22182==    by 0x1091DD: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/test_valgrind)
==22182== 
==22182== Conditional jump or move depends on uninitialised value(s)
==22182==    at 0x48E0C05: __vfprintf_internal (vfprintf-internal.c:1516)
==22182==    by 0x48CB79E: printf (printf.c:33)
==22182==    by 0x1091DD: main (in /home/jeanchien/下載/ghact-practice/511558023/lab5/test_valgrind)
==22182== 
3==22182== 
==22182== HEAP SUMMARY:
==22182==     in use at exit: 0 bytes in 0 blocks
==22182==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==22182== 
==22182== All heap blocks were freed -- no leaks are possible
==22182== 
==22182== Use --track-origins=yes to see where uninitialised values come from
==22182== For lists of detected and suppressed errors, rerun with: -s
==22182== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==22064==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f631eb85020 at pc 0x55fe43ed53ab bp 0x7ffd47cd62f0 sp 0x7ffd47cd62e0
READ of size 4 at 0x7f631eb85020 thread T0
    #0 0x55fe43ed53aa in main /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:13
    #1 0x7f63223ab082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55fe43ed518d in _start (/home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf_asan+0x118d)
Address 0x7f631eb85020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55fe43ed5258 in user_after_return /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:5
  This frame has 1 object(s):
    [32, 36) 'buf' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/jeanchien/下載/ghact-practice/511558023/lab5/demo/uaf.c:13 in main
Shadow bytes around the buggy address:
  0x0fece3d689b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fece3d68a00: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fece3d68a10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==22064==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int heap[2] = {1,2};
    int buffer[2] = {3,4};
    int offset = &buffer[0] - &heap[1];
    heap[1+offset] = 3;
    return 0;
}
```
### Why
Beacause of redzones' location primarily on both sides, if we allocate two data, we can utilize pointers without being detected by the redzone.
