# Answer

Name: 陶國華
ID: 511558016

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     O    |  O   |
| Stack out-of-bounds  |     X    |  O   |
| Global out-of-bounds |     X    |  O   |
| Use-after-free       |     O    |  O   |
| Use-after-return     |     X    |  O   |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
int main() {
    int *array = malloc(8 * sizeof(int));
    int x = array[8];
    array[8] = 0xff;
    free(array);
    return 0;
}
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

```
### Why

