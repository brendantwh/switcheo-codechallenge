var sum_to_n_a = function(n) {
    // iterative
    var sum = 0;
    for (var i = n; i >= 0; i--) {
        sum += i;
    }

    return sum;
};

var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
    // recursive
    if (n == 0) return 0;

    return n + sum_to_n_c(n - 1);
};