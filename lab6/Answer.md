
Name: 林以旻
ID: 511558007
 
### Fuzz Monitor
```
  american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 20 min, 23 sec      │  cycles done : 1      │
│   last new path : 0 days, 0 hrs, 5 min, 57 sec       │  total paths : 21     │
│ last uniq crash : 0 days, 0 hrs, 20 min, 13 sec      │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 19 min, 55 sec      │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 11* (52.38%)      │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.00 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 2 (9.52%)              │
│ stage execs : 1146/1666 (68.79%)    │  new edges on : 2 (9.52%)              │
│ total execs : 23.3k                 │ total crashes : 2263 (1 unique)        │
│  exec speed : 0.66/sec (zzzz...)    │  total tmouts : 3735 (5 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/1120, 2/1115, 1/1105                │    levels : 4          │
│  byte flips : 0/140, 0/135, 0/125                   │   pending : 17         │
│ arithmetics : 11/6259, 0/3900, 0/2448               │  pend fav : 0          │
│  known ints : 1/308, 2/1245, 0/2127                 │ own finds : 20         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/663, 0/0                            │ stability : 100.00%    │
│        trim : 99.99%/61, 0.00%                      ├────────────────────────┘
 ─────────────────────────────────────────────────────┘          [cpu001:196%]
=======
Name: 
ID: 

### Fuzz Monitor
```


```

### Run Crash Result
```

size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==25063==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd60e014a8 (pc 0x5615faa5ae69 bp 0x7ffd626021f0 sp 0x7ffd60e014b0 T0)                                                                                                                         
    #0 0x5615faa5ae69 in main /root/AFL/lab6/src/hw0302.c:46                                                                   
    #1 0x7fd6270dd6c9 in __libc_start_call_main ../sysdeps/x86/libc-start.c:58
    #2 0x7fd6270dd784 in __libc_start_main_impl ../sysdeps/nptl/libc_start_call_main.h:360
    #3 0x5615faa5b8a0 in _start (/root/AFL/lab6/src/bmpcomp+0x28a0)

SUMMARY: AddressSanitizer: stack-overflow /root/AFL/lab6/src/hw0302.c:46 in main
==25063==ABORTING
=======

```
