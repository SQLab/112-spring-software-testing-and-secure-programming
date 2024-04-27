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
$ ../src/bmpcomp out/crashes/id:000000,sig:06,src:000000,op:flip1,pos:20

size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==13924==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe13ed4658 (pc 0x55cbf533d0be bp 0x7ffe146d2ad0 sp 0x7ffe13ed3660 T0)
    #0 0x55cbf533d0be in main /home/nems/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46
    #1 0x7f7a5a823a8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7a5a823b48 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55cbf533da34 in _start (/home/nems/112-spring-software-testing-and-secure-programming/lab6/src/bmpcomp+0x2a34) (BuildId: c339d6b18316a3ccfa85641fe85ba72599908c1b)

SUMMARY: AddressSanitizer: stack-overflow /home/nems/112-spring-software-testing-and-secure-programming/lab6/src/hw0302.c:46 in main
==13924==ABORTING

```
