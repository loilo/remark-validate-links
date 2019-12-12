# Hello

This points to the existing [examples](examples) folder.

This points to the existing [examples#invalid](examples#invalid) folder with an anchor though it has no readme.

---

This points to the existing [examples/weird#character](examples/weird%23character) folder which also has a readme.

This points to the existing [examples/weird#character](examples/weird%23character#invalid) folder which also has a readme with an `#invalid` hash.

This points to the existing [examples/weird#character](examples/weird%23character#hello) folder which also has a readme with a valid `#hello` hash.

---

This points to the non-existing [invalid](invalid) folder.

This points to the non-existing [invalid](invalid#invalid) folder with an `#invalid` anchor.

---

This points to the [project root](../..) folder.

This points to the [project root](../..#invalid-fi3wkgehq4) folder with an `#invalid-fi3wkgehq4` anchor (hash to guarantee invalidity since the root readme is not actually part of the tests).

There is no link to the project root with a valid anchor since this would couple the tests with the project root docs.
