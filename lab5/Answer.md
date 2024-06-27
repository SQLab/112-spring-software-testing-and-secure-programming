# Answer

Name: 林志嘉
ID: 512558004

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     V    |   V  |
| Stack out-of-bounds  |     X    |   V  |
| Global out-of-bounds |     X    |   V  |
| Use-after-free       |     V    |   V  |
| Use-after-return     |     V    |   V  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
  int *array = (int*)malloc(100 * sizeof(int));
  array[0] = 0;
  int res = array[argc + 200];
  free(array);
  return res;
}
```
#### Valgrind Report
```
==11955== Memcheck, a memory error detector
==11955== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==11955== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==11955== Command: ./test_valgrind
==11955== 
==11955== Syscall param map_with_linking_np(link_info) points to uninitialised byte(s)
==11955==    at 0x100067D2E: __map_with_linking_np (in /usr/lib/dyld)
==11955==    by 0x10001C88A: dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (in /usr/lib/dyld)
==11955==    by 0x10001C221: invocation function for block in dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==11955==    by 0x10001BF94: dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==11955==    by 0x10001CA08: dyld4::Loader::applyFixupsGeneric(Diagnostics&, dyld4::RuntimeState&, unsigned long long, dyld3::Array<void const*> const&, dyld3::Array<void const*> const&, bool, dyld3::Array<dyld4::Loader::MissingFlatLazySymbol> const&) const (in /usr/lib/dyld)
==11955==    by 0x100022212: dyld4::JustInTimeLoader::applyFixups(Diagnostics&, dyld4::RuntimeState&, dyld4::DyldCacheDataConstLazyScopedWriter&, bool) const (in /usr/lib/dyld)
==11955==    by 0x100009DBC: dyld4::prepare(dyld4::APIs&, dyld3::MachOAnalyzer const*) (in /usr/lib/dyld)
==11955==    by 0x1000092FE: (below main) (in /usr/lib/dyld)
==11955==  Address 0x1048e7a88 is on thread 1's stack
==11955==  in frame #1, created by dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (???:)
==11955== 
==11955== Invalid read of size 4
==11955==    at 0x100000F7E: main (test_valgrind.c:7)
==11955==  Address 0x100646a34 is 340 bytes inside an unallocated block of size 4,171,520 in arena "client"
==11955== 
==11955== 
==11955== HEAP SUMMARY:
==11955==     in use at exit: 9,108 bytes in 177 blocks
==11955==   total heap usage: 188 allocs, 11 frees, 10,513 bytes allocated
==11955== 
==11955== LEAK SUMMARY:
==11955==    definitely lost: 4,288 bytes in 134 blocks
==11955==    indirectly lost: 48 bytes in 1 blocks
==11955==      possibly lost: 576 bytes in 2 blocks
==11955==    still reachable: 4,196 bytes in 40 blocks
==11955==         suppressed: 0 bytes in 0 blocks
==11955== Rerun with --leak-check=full to see details of leaked memory
==11955== 
==11955== Use --track-origins=yes to see where uninitialised values come from
==11955== For lists of detected and suppressed errors, rerun with: -s
==11955== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 124 from 39)

==12270== Cachegrind, a high-precision tracing profiler
==12270== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==12270== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==12270== Command: ./test_valgrind
==12270== 
==12270== 
==12270== I refs:        2,150,279
```
### ASan Report
```
==12604==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x614000000364 at pc 0x00010ba0df5b bp 0x7ff7b44f2090 sp 0x7ff7b44f2088
READ of size 4 at 0x614000000364 thread T0
    #0 0x10ba0df5a in main test_valgrind.c:7
    #1 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

0x614000000364 is located 404 bytes after 400-byte region [0x614000000040,0x6140000001d0)
allocated by thread T0 here:
    #0 0x10c518a20 in wrap_malloc+0xa0 (libclang_rt.asan_osx_dynamic.dylib:x86_64h+0xdca20)
    #1 0x10ba0deec in main test_valgrind.c:5
    #2 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

SUMMARY: AddressSanitizer: heap-buffer-overflow test_valgrind.c:7 in main
Shadow bytes around the buggy address:
  0x614000000080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x614000000100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x614000000180: 00 00 00 00 00 00 00 00 00 00 fa fa fa fa fa fa
  0x614000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x614000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x614000000300: fa fa fa fa fa fa fa fa fa fa fa fa[fa]fa fa fa
  0x614000000380: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x614000000400: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x614000000480: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x614000000500: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x614000000580: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==12604==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
  int stack_array[100];
  stack_array[1] = 0;
  return stack_array[argc + 100];
}
```
#### Valgrind Report
```
==29187== Memcheck, a memory error detector
==29187== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==29187== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==29187== Command: ./Stack_Out-Of-Bounds
==29187== 
==29187== Syscall param map_with_linking_np(link_info) points to uninitialised byte(s)
==29187==    at 0x100067D2E: __map_with_linking_np (in /usr/lib/dyld)
==29187==    by 0x10001C88A: dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (in /usr/lib/dyld)
==29187==    by 0x10001C221: invocation function for block in dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==29187==    by 0x10001BF94: dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==29187==    by 0x10001CA08: dyld4::Loader::applyFixupsGeneric(Diagnostics&, dyld4::RuntimeState&, unsigned long long, dyld3::Array<void const*> const&, dyld3::Array<void const*> const&, bool, dyld3::Array<dyld4::Loader::MissingFlatLazySymbol> const&) const (in /usr/lib/dyld)
==29187==    by 0x100022212: dyld4::JustInTimeLoader::applyFixups(Diagnostics&, dyld4::RuntimeState&, dyld4::DyldCacheDataConstLazyScopedWriter&, bool) const (in /usr/lib/dyld)
==29187==    by 0x100009DBC: dyld4::prepare(dyld4::APIs&, dyld3::MachOAnalyzer const*) (in /usr/lib/dyld)
==29187==    by 0x1000092FE: (below main) (in /usr/lib/dyld)
==29187==  Address 0x1048e7a88 is on thread 1's stack
==29187==  in frame #1, created by dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (???:)
==29187== 
==29187== Conditional jump or move depends on uninitialised value(s)
==29187==    at 0x7FF80CB0C40D: exit (in /usr/lib/system/libsystem_c.dylib)
==29187==    by 0x7FF80CC53E42: dyld4::LibSystemHelpers::exit(int) const (in /usr/lib/system/libdyld.dylib)
==29187==    by 0x100009396: (below main) (in /usr/lib/dyld)
==29187== 
==29187== Syscall param exit(status) contains uninitialised byte(s)
==29187==    at 0x7FF80CC021FA: ???
==29187==    by 0x7FF80CB0C436: exit (in /usr/lib/system/libsystem_c.dylib)
==29187==    by 0x7FF80CC53E42: dyld4::LibSystemHelpers::exit(int) const (in /usr/lib/system/libdyld.dylib)
==29187==    by 0x100009396: (below main) (in /usr/lib/dyld)
==29187== 
==29187== 
==29187== HEAP SUMMARY:
==29187==     in use at exit: 9,108 bytes in 177 blocks
==29187==   total heap usage: 187 allocs, 10 frees, 10,137 bytes allocated
==29187== 
==29187== LEAK SUMMARY:
==29187==    definitely lost: 4,288 bytes in 134 blocks
==29187==    indirectly lost: 48 bytes in 1 blocks
==29187==      possibly lost: 576 bytes in 2 blocks
==29187==    still reachable: 4,196 bytes in 40 blocks
==29187==         suppressed: 0 bytes in 0 blocks
==29187== Rerun with --leak-check=full to see details of leaked memory
==29187== 
==29187== Use --track-origins=yes to see where uninitialised values come from
==29187== For lists of detected and suppressed errors, rerun with: -s
==29187== ERROR SUMMARY: 3 errors from 3 contexts (suppressed: 124 from 39)

==29261== Cachegrind, a high-precision tracing profiler
==29261== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==29261== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==29261== Command: ./Stack_Out-Of-Bounds
==29261== 
==29261== 
==29261== I refs:        2,112,902
```
### ASan Report
```
==29330==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ff7b2b46ff4 at pc 0x00010d3b8f35 bp 0x7ff7b2b46e30 sp 0x7ff7b2b46e28
READ of size 4 at 0x7ff7b2b46ff4 thread T0
    #0 0x10d3b8f34 in main Stack_Out-Of-Bounds.c:7
    #1 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

Address 0x7ff7b2b46ff4 is located in stack of thread T0 at offset 436 in frame
    #0 0x10d3b8d4f in main Stack_Out-Of-Bounds.c:4

  This frame has 1 object(s):
    [32, 432) 'stack_array' (line 5) <== Memory access at offset 436 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow Stack_Out-Of-Bounds.c:7 in main
Shadow bytes around the buggy address:
  0x7ff7b2b46d00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ff7b2b46d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ff7b2b46e00: 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00 00 00
  0x7ff7b2b46e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ff7b2b46f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7ff7b2b46f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00[f3]f3
  0x7ff7b2b47000: f3 f3 f3 f3 f3 f3 f3 f3 00 00 00 00 00 00 00 00
  0x7ff7b2b47080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ff7b2b47100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ff7b2b47180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7ff7b2b47200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==29330==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int global_array[100] = {-1};
int main(int argc, char **argv) {
  return global_array[argc + 100];
}
```
#### Valgrind Report
```
==30038== Memcheck, a memory error detector
==30038== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==30038== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==30038== Command: ./Global_Out-Of-Bounds
==30038== 
==30038== 
==30038== HEAP SUMMARY:
==30038==     in use at exit: 9,108 bytes in 177 blocks
==30038==   total heap usage: 187 allocs, 10 frees, 10,141 bytes allocated
==30038== 
==30038== LEAK SUMMARY:
==30038==    definitely lost: 4,288 bytes in 134 blocks
==30038==    indirectly lost: 48 bytes in 1 blocks
==30038==      possibly lost: 576 bytes in 2 blocks
==30038==    still reachable: 4,196 bytes in 40 blocks
==30038==         suppressed: 0 bytes in 0 blocks
==30038== Rerun with --leak-check=full to see details of leaked memory
==30038== 
==30038== For lists of detected and suppressed errors, rerun with: -s
==30038== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 122 from 38)

==29992== Cachegrind, a high-precision tracing profiler
==29992== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==29992== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==29992== Command: ./Global_Out-Of-Bounds
==29992== 
==29992== 
==29992== I refs:        2,051,687
```
### ASan Report
```
==30115==ERROR: AddressSanitizer: global-buffer-overflow on address 0x00010b1a2194 at pc 0x00010b1a0ed9 bp 0x7ff7b4d5f090 sp 0x7ff7b4d5f088
READ of size 4 at 0x00010b1a2194 thread T0
    #0 0x10b1a0ed8 in main Global_Out-Of-Bounds.c:6
    #1 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

0x00010b1a2194 is located 4 bytes after global variable 'global_array' defined in 'Global_Out-Of-Bounds.c' (0x10b1a2000) of size 400
SUMMARY: AddressSanitizer: global-buffer-overflow Global_Out-Of-Bounds.c:6 in main
Shadow bytes around the buggy address:
  0x00010b1a1f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010b1a1f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010b1a2000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010b1a2080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010b1a2100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x00010b1a2180: 00 00[f9]f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x00010b1a2200: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x00010b1a2280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010b1a2300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010b1a2380: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010b1a2400: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==30115==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
  int *array = (int*)malloc(100 * sizeof(int));
  free(array);
  return array[argc];
}
```
#### Valgrind Report
```
==30879== Memcheck, a memory error detector
==30879== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==30879== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==30879== Command: ./Use-After-Free
==30879== 
==30879== Syscall param map_with_linking_np(link_info) points to uninitialised byte(s)
==30879==    at 0x100067D2E: __map_with_linking_np (in /usr/lib/dyld)
==30879==    by 0x10001C88A: dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (in /usr/lib/dyld)
==30879==    by 0x10001C221: invocation function for block in dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==30879==    by 0x10001BF94: dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==30879==    by 0x10001CA08: dyld4::Loader::applyFixupsGeneric(Diagnostics&, dyld4::RuntimeState&, unsigned long long, dyld3::Array<void const*> const&, dyld3::Array<void const*> const&, bool, dyld3::Array<dyld4::Loader::MissingFlatLazySymbol> const&) const (in /usr/lib/dyld)
==30879==    by 0x100022212: dyld4::JustInTimeLoader::applyFixups(Diagnostics&, dyld4::RuntimeState&, dyld4::DyldCacheDataConstLazyScopedWriter&, bool) const (in /usr/lib/dyld)
==30879==    by 0x100009DBC: dyld4::prepare(dyld4::APIs&, dyld3::MachOAnalyzer const*) (in /usr/lib/dyld)
==30879==    by 0x1000092FE: (below main) (in /usr/lib/dyld)
==30879==  Address 0x1048e7a88 is on thread 1's stack
==30879==  in frame #1, created by dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (???:)
==30879== 
==30879== Invalid read of size 4
==30879==    at 0x100000F91: main (Use-After-Free.c:7)
==30879==  Address 0x100646714 is 4 bytes inside a block of size 400 free'd
==30879==    at 0x100503E5E: free (in /usr/local/Cellar/valgrind/HEAD-93191c1/libexec/valgrind/vgpreload_memcheck-amd64-darwin.so)
==30879==    by 0x100000F8D: main (Use-After-Free.c:6)
==30879==  Block was alloc'd at
==30879==    at 0x100501FE0: malloc (in /usr/local/Cellar/valgrind/HEAD-93191c1/libexec/valgrind/vgpreload_memcheck-amd64-darwin.so)
==30879==    by 0x100000F82: main (Use-After-Free.c:5)
==30879== 
==30879== 
==30879== HEAP SUMMARY:
==30879==     in use at exit: 9,108 bytes in 177 blocks
==30879==   total heap usage: 188 allocs, 11 frees, 10,517 bytes allocated
==30879== 
==30879== LEAK SUMMARY:
==30879==    definitely lost: 4,288 bytes in 134 blocks
==30879==    indirectly lost: 48 bytes in 1 blocks
==30879==      possibly lost: 576 bytes in 2 blocks
==30879==    still reachable: 4,196 bytes in 40 blocks
==30879==         suppressed: 0 bytes in 0 blocks
==30879== Rerun with --leak-check=full to see details of leaked memory
==30879== 
==30879== Use --track-origins=yes to see where uninitialised values come from
==30879== For lists of detected and suppressed errors, rerun with: -s
==30879== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 124 from 39)

==30949== Cachegrind, a high-precision tracing profiler
==30949== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==30949== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==30949== Command: ./Use-After-Free
==30949== 
==30949== 
==30949== I refs:        2,148,946
```
### ASan Report
```
==30997==ERROR: AddressSanitizer: heap-use-after-free on address 0x614000000044 at pc 0x000107636f58 bp 0x7ff7b88c90a0 sp 0x7ff7b88c9098
READ of size 4 at 0x614000000044 thread T0
    #0 0x107636f57 in main Use-After-Free.c:7
    #1 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

0x614000000044 is located 4 bytes inside of 400-byte region [0x614000000040,0x6140000001d0)
freed by thread T0 here:
    #0 0x108118b69 in wrap_free+0xa9 (libclang_rt.asan_osx_dynamic.dylib:x86_64h+0xdcb69)
    #1 0x107636f1d in main Use-After-Free.c:6
    #2 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

previously allocated by thread T0 here:
    #0 0x108118a20 in wrap_malloc+0xa0 (libclang_rt.asan_osx_dynamic.dylib:x86_64h+0xdca20)
    #1 0x107636f12 in main Use-After-Free.c:5
    #2 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

SUMMARY: AddressSanitizer: heap-use-after-free Use-After-Free.c:7 in main
Shadow bytes around the buggy address:
  0x613ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x613ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x613ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x613fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x613fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x614000000000: fa fa fa fa fa fa fa fa[fd]fd fd fd fd fd fd fd
  0x614000000080: fd fd fd fd fd fd fd fd fd fd fd fd fd fd fd fd
  0x614000000100: fd fd fd fd fd fd fd fd fd fd fd fd fd fd fd fd
  0x614000000180: fd fd fd fd fd fd fd fd fd fd fa fa fa fa fa fa
  0x614000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x614000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==30997==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int *ptr;

__attribute__((noinline))
void FunctionThatEscapesLocalObject() {
  int local[100];
  ptr = &local[0];
}

int main(int argc, char **argv) {
  FunctionThatEscapesLocalObject();
  return ptr[argc];
}
```
#### Valgrind Report
```
==38633== Memcheck, a memory error detector
==38633== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==38633== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==38633== Command: ./Use-After-Return
==38633== 
==38633== Syscall param map_with_linking_np(link_info) points to uninitialised byte(s)
==38633==    at 0x100068D2E: __map_with_linking_np (in /usr/lib/dyld)
==38633==    by 0x10001D88A: dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (in /usr/lib/dyld)
==38633==    by 0x10001D221: invocation function for block in dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==38633==    by 0x10001CF94: dyld4::Loader::setUpPageInLinking(Diagnostics&, dyld4::RuntimeState&, unsigned long, unsigned long long, dyld3::Array<void const*> const&) const (in /usr/lib/dyld)
==38633==    by 0x10001DA08: dyld4::Loader::applyFixupsGeneric(Diagnostics&, dyld4::RuntimeState&, unsigned long long, dyld3::Array<void const*> const&, dyld3::Array<void const*> const&, bool, dyld3::Array<dyld4::Loader::MissingFlatLazySymbol> const&) const (in /usr/lib/dyld)
==38633==    by 0x100023212: dyld4::JustInTimeLoader::applyFixups(Diagnostics&, dyld4::RuntimeState&, dyld4::DyldCacheDataConstLazyScopedWriter&, bool) const (in /usr/lib/dyld)
==38633==    by 0x10000ADBC: dyld4::prepare(dyld4::APIs&, dyld3::MachOAnalyzer const*) (in /usr/lib/dyld)
==38633==    by 0x10000A2FE: (below main) (in /usr/lib/dyld)
==38633==  Address 0x1048e8a88 is on thread 1's stack
==38633==  in frame #1, created by dyld4::setUpPageInLinkingRegions(dyld4::RuntimeState&, dyld4::Loader const*, unsigned long, unsigned short, unsigned short, bool, dyld3::Array<dyld4::PageInLinkingRange> const&, dyld3::Array<void const*> const&) (???:)
==38633== 
==38633== Invalid read of size 4
==38633==    at 0x100000F8A: ??? (in ./Use-After-Return)
==38633==    by 0x10000A365: (below main) (in /usr/lib/dyld)
==38633==  Address 0x1048eaf14 is on thread 1's stack
==38633==  428 bytes below stack pointer
==38633== 
==38633== 
==38633== HEAP SUMMARY:
==38633==     in use at exit: 9,108 bytes in 177 blocks
==38633==   total heap usage: 187 allocs, 10 frees, 10,125 bytes allocated
==38633== 
==38633== LEAK SUMMARY:
==38633==    definitely lost: 4,288 bytes in 134 blocks
==38633==    indirectly lost: 48 bytes in 1 blocks
==38633==      possibly lost: 576 bytes in 2 blocks
==38633==    still reachable: 4,196 bytes in 40 blocks
==38633==         suppressed: 0 bytes in 0 blocks
==38633== Rerun with --leak-check=full to see details of leaked memory
==38633== 
==38633== Use --track-origins=yes to see where uninitialised values come from
==38633== For lists of detected and suppressed errors, rerun with: -s
==38633== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 124 from 39)

==38648== Cachegrind, a high-precision tracing profiler
==38648== Copyright (C) 2002-2017, and GNU GPL'd, by Nicholas Nethercote et al.
==38648== Using Valgrind-3.23.0.GIT-lbmacos and LibVEX; rerun with -h for copyright info
==38648== Command: ./Use-After-Return
==38648== 
==38648== 
==38648== I refs:        2,116,741
```
### ASan Report
```
==39212==ERROR: AddressSanitizer: stack-use-after-return on address 0x000105690024 at pc 0x00010361cf31 bp 0x7ff7bc8e3060 sp 0x7ff7bc8e3058
READ of size 4 at 0x000105690024 thread T0
    #0 0x10361cf30 in main+0xa0 (Use-After-Return:x86_64+0x100000f30)
    #1 0x7ff80c8b0365 in start+0x795 (dyld:x86_64+0xfffffffffff5c365)

Address 0x000105690024 is located in stack of thread T0 at offset 36 in frame
    #0 0x10361cc2f in FunctionThatEscapesLocalObject+0xf (Use-After-Return:x86_64+0x100000c2f)

  This frame has 1 object(s):
    [32, 432) 'local' <== Memory access at offset 36 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (Use-After-Return:x86_64+0x100000f30) in main+0xa0
Shadow bytes around the buggy address:
  0x00010568fd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010568fe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010568fe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010568ff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00010568ff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x000105690000: f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x000105690080: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x000105690100: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x000105690180: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x000105690200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105690280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==39212==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
    int a = (int)malloc(8 * sizeof(int));
    int b = (int)malloc(8 * sizeof(int));
    int res = a[argc + 12];
    free(a);
    free(b);
    return res; 
}
```
### Why
在這段程式碼中，我們對 a 進行越界寫入，並且寫入的位置在 b 的區塊內。由於 a 和 b 是相鄰的，所以 ASan 無法偵測到這種越界錯誤。
