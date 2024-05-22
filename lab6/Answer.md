Name: 陳銘庭
ID: 512558011

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 28 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 23 sec       │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 1 min, 17 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 26 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.50 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (12.50%)             │
│ stage execs : 76/2215 (3.43%)       │  new edges on : 3 (37.50%)             │
│ total execs : 1033                  │ total crashes : 48 (1 unique)          │
│  exec speed : 17.84/sec (zzzz...)   │  total tmouts : 397 (7 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/256, 3/255, 1/253                   │    levels : 2          │
│  byte flips : 0/32, 0/31, 0/29                      │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu001: 45%]

+++ Testing aborted by user +++
[+] We're done here. Have a nice day!


```

### Run Crash Result
```
tim@tim-virtual-machine:~/Desktop/112-spring-software-testing-and-secure-programming/lab6/fuzz$ ../src/bmpcomp out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20 
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==51962==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd7803f048 (pc 0x5e56deabf0c7 bp 0x7ffd7883e4a0 sp 0x7ffd7803e050 T0)
    #0 0x5e56deabf0c7 in main /home/tim/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7c3d77829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7c3d77829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5e56deabfb14 in _start (/home/tim/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2b14)

SUMMARY: AddressSanitizer: stack-overflow /home/tim/Desktop/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==51962==ABORTING

```
