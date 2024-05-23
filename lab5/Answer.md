# Answer


Name: Chia-Yang Huang
ID: 511559025

gcc:11.4.0
valgrind:3.16.1

Name: 
ID: 


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   Yes    | Yes  |
| Stack out-of-bounds  |   No     | Yes  |
| Global out-of-bounds |   No     | Yes  |
| Use-after-free       |   Yes    | Yes  |
| Use-after-return     |   Yes    | Yes  |
| Heap out-of-bounds   |          |      |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *s = (char *)malloc(10);
    s[10] = 'A';
    putchar(s[10]);
    return 0;
}
```
#### Valgrind Report
```
==59335== Memcheck, a memory error detector
==59335== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==59335== Using Valgrind-3.16.1 and LibVEX; rerun with -h for copyright info
==59335== Command: ./heap
==59335==
==59335== Invalid write of size 1
==59335==    at 0x10918B: main (in /mnt/c/Users/NPT/Desktop/test/heap)
==59335==  Address 0x4a8704a is 0 bytes after a block of size 10 alloc'd
==59335==    at 0x48477F5: malloc (in /usr/local/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==59335==    by 0x10917E: main (in /mnt/c/Users/NPT/Desktop/test/heap)
==59335==
==59335== Invalid read of size 1
==59335==    at 0x109196: main (in /mnt/c/Users/NPT/Desktop/test/heap)
==59335==  Address 0x4a8704a is 0 bytes after a block of size 10 alloc'd
==59335==    at 0x48477F5: malloc (in /usr/local/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==59335==    by 0x10917E: main (in /mnt/c/Users/NPT/Desktop/test/heap)
==59335==
==59335== HEAP SUMMARY:
==59335==     in use at exit: 10 bytes in 1 blocks
==59335==   total heap usage: 2 allocs, 1 frees, 1,034 bytes allocated
==59335==
==59335== LEAK SUMMARY:
==59335==    definitely lost: 10 bytes in 1 blocks
==59335==    indirectly lost: 0 bytes in 0 blocks
==59335==      possibly lost: 0 bytes in 0 blocks
==59335==    still reachable: 0 bytes in 0 blocks
==59335==         suppressed: 0 bytes in 0 blocks
==59335== Rerun with --leak-check=full to see details of leaked memory
==59335==
==59335== For lists of detected and suppressed errors, rerun with: -s
==59335== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==82061==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001a at pc 0x5597d048c23f bp 0x7ffeec367160 sp 0x7ffeec367150
WRITE of size 1 at 0x60200000001a thread T0
    #0 0x5597d048c23e in main (/mnt/c/Users/NPT/Desktop/test/heap+0x123e)
    #1 0x7f724252ad8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f724252ae3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x5597d048c124 in _start (/mnt/c/Users/NPT/Desktop/test/heap+0x1124)

0x60200000001a is located 0 bytes to the right of 10-byte region [0x602000000010,0x60200000001a)
allocated by thread T0 here:
    #0 0x7f72427de887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5597d048c1fe in main (/mnt/c/Users/NPT/Desktop/test/heap+0x11fe)
    #2 0x7f724252ad8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)

SUMMARY: AddressSanitizer: heap-buffer-overflow (/mnt/c/Users/NPT/Desktop/test/heap+0x123e) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00[02]fa fa fa fa fa fa fa fa fa fa fa fa
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
==82061==ABORTING

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Stack out-of-bounds
#### Source code
```

#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *s = "0123456789";
    s[11] = 'A';
    putchar(s[11]);
    return 0;
}
```
#### Valgrind Report
```
==17244== Memcheck, a memory error detector
==17244== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==17244== Using Valgrind-3.16.1 and LibVEX; rerun with -h for copyright info
==17244== Command: ./stack
==17244==
==17244== Process terminating with default action of signal 11 (SIGSEGV)
==17244==  Bad permissions for mapped region at address 0x10A00F
==17244==    at 0x109168: main (in /mnt/c/Users/NPT/Desktop/test/stack)
==17244==
==17244== Process terminating with default action of signal 11 (SIGSEGV)
==17244==  General Protection Fault
==17244==    at 0x48F4EC2: __pthread_once_slow (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==17244==    by 0x49C38C2: __rpc_thread_variables (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==17244==    by 0x4A16C0C: free_mem (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==17244==    by 0x4A16741: __libc_freeres (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==17244==    by 0x483F1BD: _vgnU_freeres (in /usr/local/lib/valgrind/vgpreload_core-amd64-linux.so)
==17244==
==17244== HEAP SUMMARY:
==17244==     in use at exit: 0 bytes in 0 blocks
==17244==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==17244==
==17244== All heap blocks were freed -- no leaks are possible
==17244==
==17244== For lists of detected and suppressed errors, rerun with: -s
==17244== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Segmentation fault
```
### ASan Report
```
==86653==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55aa8489402b at pc 0x55aa8489325c bp 0x7ffc964ff8d0 sp 0x7ffc964ff8c0
WRITE of size 1 at 0x55aa8489402b thread T0
    #0 0x55aa8489325b in main (/mnt/c/Users/NPT/Desktop/test/stack+0x125b)
    #1 0x7f36d516bd8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f36d516be3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x55aa84893144 in _start (/mnt/c/Users/NPT/Desktop/test/stack+0x1144)

0x55aa8489402b is located 0 bytes to the right of global variable '*.LC0' defined in 'stack.c' (0x55aa84894020) of size 11
  '*.LC0' is ascii string '0123456789'
SUMMARY: AddressSanitizer: global-buffer-overflow (/mnt/c/Users/NPT/Desktop/test/stack+0x125b) in main
Shadow bytes around the buggy address:
  0x0ab5d090a7b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a7c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a7d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a7e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a7f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ab5d090a800: 00 00 00 00 00[03]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0ab5d090a810: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab5d090a850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==86653==ABORTING


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
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

char global [4] ;
int main(void)
{
        global[4] = 'a';
	printf("%c\n",global[4]);
        return 0;
}
```
#### Valgrind Report
```
==111845== Memcheck, a memory error detector
==111845== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==111845== Using Valgrind-3.16.1 and LibVEX; rerun with -h for copyright info
==111845== Command: ./global
==111845== 
==111845== 
==111845== HEAP SUMMARY:
==111845==     in use at exit: 0 bytes in 0 blocks
==111845==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==111845== 
==111845== All heap blocks were freed -- no leaks are possible
==111845== 
==111845== For lists of detected and suppressed errors, rerun with: -s
==111845== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==89798==ERROR: AddressSanitizer: global-buffer-overflow on address 0x560a9c1100e4 at pc 0x560a9c10d228 bp 0x7ffc8e686610 sp 0x7ffc8e686600
WRITE of size 1 at 0x560a9c1100e4 thread T0
    #0 0x560a9c10d227 in main (/mnt/c/Users/NPT/Desktop/test/global+0x1227)
    #1 0x7f55e8d27d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f55e8d27e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x560a9c10d124 in _start (/mnt/c/Users/NPT/Desktop/test/global+0x1124)

0x560a9c1100e4 is located 0 bytes to the right of global variable 'global' defined in 'global.c:5:6' (0x560a9c1100e0) of size 4
SUMMARY: AddressSanitizer: global-buffer-overflow (/mnt/c/Users/NPT/Desktop/test/global+0x1227) in main
Shadow bytes around the buggy address:
  0x0ac1d3819fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d3819fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d3819fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d3819ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d381a000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ac1d381a010: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00[04]f9 f9 f9
  0x0ac1d381a020: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d381a030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d381a040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d381a050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac1d381a060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==89798==ABORTING


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

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
    char * s = malloc(sizeof(char) * 5);
    for(int i = 0; i < 5; i++){
        s[i] = 'a';
    }
    free(s);
    printf("%c\n", s[4]);
    return 0;
}
```
#### Valgrind Report
```
==115931== Memcheck, a memory error detector
==115931== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==115931== Using Valgrind-3.16.1 and LibVEX; rerun with -h for copyright info
==115931== Command: ./free
==115931== Invalid read of size 1
==115931==    at 0x1091A6: main (in /mnt/c/Users/NPT/Desktop/free)
==115931==  Address 0x4a43044 is 4 bytes inside a block of size 5 free'd
==115931==    at 0x484317B: free (vg_replace_malloc.c:872)
==115931==    by 0x10919D: main (in /mnt/c/Users/NPT/Desktop/free)
==115931==  Block was alloc'd at
==115931==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==115931==    by 0x10916A: main (in /mnt/c/Users/NPT/Desktop/free)
==115931== 
a
==115931== 
==115931== HEAP SUMMARY:
==115931==     in use at exit: 0 bytes in 0 blocks
==115931==   total heap usage: 2 allocs, 2 frees, 1,029 bytes allocated
==115931== 
==115931== All heap blocks were freed -- no leaks are possible
==115931== 
==115931== For lists of detected and suppressed errors, rerun with: -s
==115931== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==114001==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000014 at pc 0x55bf43cdc303 bp 0x7ffd4e9292a0 sp 0x7ffd4e929290
READ of size 1 at 0x602000000014 thread T0
    #0 0x55bf43cdc302 in main (/mnt/c/Users/NPT/Desktop/test/free+0x1302)
    #1 0x7f6f30555d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f6f30555e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x55bf43cdc184 in _start (/mnt/c/Users/NPT/Desktop/test/free+0x1184)

0x602000000014 is located 4 bytes inside of 5-byte region [0x602000000010,0x602000000015)
freed by thread T0 here:
    #0 0x7f6f30809537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55bf43cdc2c6 in main (/mnt/c/Users/NPT/Desktop/test/free+0x12c6)
    #2 0x7f6f30555d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)

previously allocated by thread T0 here:
    #0 0x7f6f30809887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55bf43cdc25e in main (/mnt/c/Users/NPT/Desktop/test/free+0x125e)
    #2 0x7f6f30555d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)

SUMMARY: AddressSanitizer: heap-use-after-free (/mnt/c/Users/NPT/Desktop/test/free+0x1302) in main
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
==114001==ABORTING

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
==77495== Memcheck, a memory error detector
==77495== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==77495== Using Valgrind-3.16.1 and LibVEX; rerun with -h for copyright info
==77495== Command: ./return
==77495== Conditional jump or move depends on uninitialised value(s)
==77495==    at 0x48D1AD6: __vfprintf_internal (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x48BB79E: printf (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x1091DD: main (in /mnt/c/Users/NPT/Desktop/test/return)
==77495==
==77495== Use of uninitialised value of size 8
==77495==    at 0x48B52EB: _itoa_word (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x48D0ABD: __vfprintf_internal (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x48BB79E: printf (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x1091DD: main (in /mnt/c/Users/NPT/Desktop/test/return)
==77495==
==77495== Conditional jump or move depends on uninitialised value(s)
==77495==    at 0x48B52FC: _itoa_word (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x48D0ABD: __vfprintf_internal (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x48BB79E: printf (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x1091DD: main (in /mnt/c/Users/NPT/Desktop/test/return)
==77495==
==77495== Conditional jump or move depends on uninitialised value(s)
==77495==    at 0x48D15C3: __vfprintf_internal (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x48BB79E: printf (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x1091DD: main (in /mnt/c/Users/NPT/Desktop/test/return)
==77495==
==77495== Conditional jump or move depends on uninitialised value(s)
==77495==    at 0x48D0C05: __vfprintf_internal (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x48BB79E: printf (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==77495==    by 0x1091DD: main (in /mnt/c/Users/NPT/Desktop/test/return)
==77495==
3==77495==
==77495== HEAP SUMMARY:
==77495==     in use at exit: 0 bytes in 0 blocks
==77495==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==77495==
==77495== All heap blocks were freed -- no leaks are possible
==77495==
==77495== Use --track-origins=yes to see where uninitialised values come from
==77495== For lists of detected and suppressed errors, rerun with: -s
==77495== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==1560987==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f631eb85020 at pc 0x55fe43ed53ab bp 0x7ffd47cd62f0 sp 0x7ffd47cd62e0
READ of size 4 at 0x7f631eb85020 thread T0
    #0 0x55fe43ed53aa in main /mnt/c/Users/NPT/Desktop/test/return.c:13
    #1 0x7f63223ab082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55fe43ed518d in _start (/mnt/c/Users/NPT/Desktop/test/return+0x118d)
Address 0x7f631eb85020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55fe43ed5258 in user_after_return /mnt/c/Users/NPT/Desktop/test/return.c:5
  This frame has 1 object(s):
    [32, 36) 'buf' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /mnt/c/Users/NPT/Desktop/test/return.c:13 in main
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
==1560987==ABORTING

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
#include <stdio.h>

int main()
{
    char a[8] = {};
    char b[8] = {};

    a[8 + 24] = 'A';
    printf("%c %c\n", a[8 + 24], b[0]);

    return 0;
}
```
### Why
因為過程中不會針對 redzone 進行讀寫，故不會觸發 ASan 的檢查機制，程式依然正常執行。

```
### Why

