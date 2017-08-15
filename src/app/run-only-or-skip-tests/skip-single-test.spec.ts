// xdescribe skips a test suite
// xit skips a single test
xdescribe('This test suite will be skipped', () => {
  xit('This test will be skipped', () => {
    expect(true).toBe(true);
  });
});
