// spec/multidex.js: Test multidex.  Also test the loader, which doesn't really
// need its own spec file.

describe('asyncinator', function() {
    let M={};       // loaded modules
    let was_extra_work_called = false;

    beforeAll(R('multidex',M, function() { was_extra_work_called = true; }));

    it('loads modules', function() {
        expect(M.multidex).not.toBeUndefined();
    });

    it('calls the extra-work function', function() {
        expect(was_extra_work_called).toBe(true);
    });
});

describe('multidex', function() {
    let M={};       // loaded modules
    let dex;        // a multidex we will test

    beforeAll(R('multidex',M));

    it('can be loaded successfully',
        function() { expect(M.multidex).not.toBeUndefined(); });

    it('can create a new multidex', function(){
        dex = M.multidex(['key'],['val1','val2']);
        expect(dex).not.toBeUndefined();
        expect(dex.all_values).not.toBeUndefined();
    });

    it('can store values by key', function(){
        let val = dex.add({key: 42, val1: '1', val2: '2'});
        expect(val).not.toBeFalsy();
    });

    it('can retrieve values by key', function(){
        let retrieved = dex.by_key(42);
        expect(retrieved).not.toBeFalsy();
        expect(retrieved.key).toBe(42);
        expect(retrieved.val1).toBe('1');
        expect(retrieved.val2).toBe('2');
    });
});
// vi: set ts=4 sts=4 sw=4 et ai fo-=o fo-=r: //
