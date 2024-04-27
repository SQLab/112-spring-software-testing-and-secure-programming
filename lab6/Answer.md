Name: 劉昀昕

ID: 512558015

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 8 min, 56 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 52 sec       │  total paths : 22     │
│ last uniq crash : 0 days, 0 hrs, 8 min, 43 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 8 min, 38 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 1 (4.55%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.11 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 3 (13.64%)             │
│ stage execs : 327/2324 (14.07%)     │  new edges on : 3 (13.64%)             │
│ total execs : 7467                  │ total crashes : 703 (1 unique)         │
│  exec speed : 9.01/sec (zzzz...)    │  total tmouts : 1102 (6 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/384, 4/382, 1/378                   │    levels : 3          │
│  byte flips : 0/48, 0/46, 0/42                      │   pending : 21         │
│ arithmetics : 8/2682, 0/1029, 0/678                 │  pend fav : 3          │
│  known ints : 1/94, 2/365, 0/586                    │ own finds : 21         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/204, 0/0                            │ stability : 100.00%    │
│        trim : 100.00%/40, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001: 47%]

```

### Run Crash Result
```
00,op:flip1,pos:20
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==12069==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x7f5ee6079d5e bp 0x000000000036 sp 0x7ffc36a921b0 T0)
==12069==The signal is caused by a READ memory access.
==12069==Hint: address points to the zero page.
    #0 0x7f5ee6079d5e in __GI__IO_fwrite libio/iofwrite.c:37
    #1 0x7f5ee646aa83 in __interceptor_fwrite ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors.inc:1228
    #2 0x564255e58eda in main /home/nems/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:42
    #3 0x7f5ee6023a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #4 0x7f5ee6023b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #5 0x564255e59a34 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2a34) (BuildId: c339d6b18316a3ccfa85641fe85ba72599908c1b)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV libio/iofwrite.c:37 in __GI__IO_fwrite
==12069==ABORTING

```
