import test from 'node:test';
import assert from 'node:assert/strict';
import {todayKey,addDays,daysBetween,isOpen,earliestDate,validateRange,available,inactivityStatus,preparationSegments} from '../dist/domain.mjs';
const today='2026-11-04';
const check=(a,b,branch='paquis',blocked=[])=>validateRange(a,b,branch,{today,blocked});

test('dates use Zurich and remain stable through daylight saving',()=>{
  assert.equal(todayKey(new Date('2026-11-04T23:30:00Z')),'2026-11-05');
  assert.equal(addDays('2026-10-24',7),'2026-10-31');
  assert.equal(daysBetween('2026-10-24','2026-10-31'),7);
});
test('all branches close Sunday and Monday, only Charmilles opens Saturday',()=>{
  for(const branch of ['charmilles','paquis','lancy','meyrin','thonex','all']) {
    assert.equal(isOpen('2026-11-08',branch),false);
    assert.equal(isOpen('2026-11-09',branch),false);
    assert.equal(isOpen('2026-11-06',branch),true);
    assert.equal(isOpen('2026-11-07',branch),branch==='charmilles'||branch==='all');
  }
});
test('two-day preparation is enforced, skipping closed pickup days',()=>{
  assert.ok(check('2026-11-05','2026-11-06').includes('2 jours'));
  assert.equal(earliestDate('paquis',today),'2026-11-06');
  assert.equal(earliestDate('paquis','2026-11-05'),'2026-11-10');
  assert.equal(earliestDate('charmilles','2026-11-05'),'2026-11-07');
});
test('preparation bars cover exactly two days and wrap across calendar weeks',()=>{
  assert.deepEqual(preparationSegments('2026-11','2026-11-04'),[{row:2,column:3,span:2}]);
  assert.deepEqual(preparationSegments('2026-11','2026-11-08'),[{row:2,column:7,span:1},{row:3,column:1,span:1}]);
});
test('preparation bars split correctly between months and years',()=>{
  assert.deepEqual(preparationSegments('2026-12','2026-12-31'),[{row:5,column:4,span:1}]);
  assert.deepEqual(preparationSegments('2027-01','2026-12-31'),[{row:1,column:5,span:1}]);
  assert.deepEqual(preparationSegments('2027-02','2026-12-31'),[]);
});
test('maximum seven-day range includes closed intermediate days',()=>{
  assert.equal(check('2026-11-06','2026-11-13'),'');
  assert.ok(check('2026-11-06','2026-11-14','charmilles').includes('7 jours'));
  assert.ok(check('2026-11-06','2026-11-06').includes('après'));
  assert.ok(check('2026-11-10','2026-11-06').includes('après'));
});
test('collection and return dates respect branch-specific opening days',()=>{
  assert.equal(check('2026-11-07','2026-11-10','charmilles'),'');
  assert.ok(check('2026-11-07','2026-11-10','lancy').includes('samedi'));
  assert.ok(check('2026-11-06','2026-11-08','charmilles').includes('jours'));
  assert.equal(check('2026-11-07','2026-11-10','all'),'');
});
test('availability catches conflicts inside and at the edges of a range',()=>{
  const blocks=[{start:'2026-11-10',end:'2026-11-12'}];
  assert.ok(check('2026-11-06','2026-11-13','paquis',blocks).includes('réservé'));
  assert.ok(check('2026-11-12','2026-11-13','paquis',blocks).includes('réservé'));
  assert.equal(check('2026-11-13','2026-11-17','paquis',blocks),'');
  const p={id:1};
  const reservations=[{items:[{id:1,start:'2026-11-10',end:'2026-11-12'}]}];
  assert.equal(available(p,'2026-11-10','2026-11-13','charmilles',today,reservations),false);
  assert.equal(available(p,'2026-11-13','2026-11-17','lancy',today,reservations),true);
});
test('independent object dates do not impose a cart-wide interval',()=>{
  assert.equal(check('2026-11-06','2026-11-10'),'');
  assert.equal(check('2026-11-10','2026-11-13'),'');
});
test('inactivity lifecycle warns at one year and deletes after thirty days',()=>{
  assert.equal(inactivityStatus({lastActive:'2026-10-01'},today),'active');
  assert.equal(inactivityStatus({lastActive:'2025-11-04'},today),'warn');
  assert.equal(inactivityStatus({lastActive:'2025-10-01',warningAt:'2026-10-06'},today),'active');
  assert.equal(inactivityStatus({lastActive:'2025-10-01',warningAt:'2026-10-05'},today),'delete');
});
