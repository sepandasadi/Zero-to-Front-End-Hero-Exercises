# Chapter 11: Browser APIs - Quiz

## Multiple Choice

**1. What is the main difference between localStorage and sessionStorage?**
a) localStorage is faster  
b) localStorage persists after browser closes, sessionStorage doesn't  
c) sessionStorage has more storage space  
d) They're the same  

**Answer**: b

---

**2. How do you store an object in localStorage?**
a) localStorage.setItem('key', object)  
b) localStorage.setItem('key', JSON.stringify(object))  
c) localStorage.object = myObject  
d) localStorage.save(object)  

**Answer**: b

---

**3. What does Intersection Observer help with?**
a) Detecting when elements enter/leave viewport  
b) Debugging JavaScript errors  
c) Network request monitoring  
d) Cross-tab communication  

**Answer**: a

---

**4. What permission is required for Geolocation API?**
a) No permission needed  
b) User must grant permission  
c) Only HTTPS sites can use it  
d) Both b and c  

**Answer**: d

---

**5. What happens if Notification.requestPermission() is denied?**
a) Function throws an error  
b) Returns "denied" string  
c) Page reloads  
d) Notification shows anyway  

**Answer**: b

---

## True/False

**6. localStorage can store unlimited data.**
**Answer**: False (typically 5-10MB limit)

**7. Intersection Observer is better than scroll events for performance.**
**Answer**: True

**8. You can send notifications even without user permission in emergencies.**
**Answer**: False

**9. The History API allows you to change URL without page reload.**
**Answer**: True

**10. Geolocation always returns accurate coordinates.**
**Answer**: False (depends on device/method)

---

## Code Output

**11. What logs?**
```js
localStorage.setItem('count', 5);
console.log(typeof localStorage.getItem('count'));
```
a) "number"  
b) "string"  
c) "object"  
d) undefined  

**Answer**: b (localStorage stores everything as strings)

---

**12. What logs?**
```js
if ('geolocation' in navigator) {
  console.log('Supported');
} else {
  console.log('Not supported');
}
```
a) Always "Supported"  
b) Always "Not supported"  
c) Depends on browser  
d) Throws error  

**Answer**: c

---

**13. What happens?**
```js
const observer = new IntersectionObserver((entries) => {
  console.log(entries.length);
});
observer.observe(element1);
observer.observe(element2);
// How many entries on first intersection?
```
a) 1  
b) 2  
c) Depends on which intersects first  
d) Error  

**Answer**: c

---

**14. What logs?**
```js
history.pushState({ page: 1 }, '', '/page1');
history.pushState({ page: 2 }, '', '/page2');
history.back();
// What is history.state?
```
a) { page: 1 }  
b) { page: 2 }  
c) null  
d) undefined  

**Answer**: a

---

**15. What's the correct way to check Notification permission?**
a) Notification.permission === 'granted'  
b) Notification.hasPermission()  
c) navigator.permissions.query({name:'notifications'})  
d) Both a and c work  

**Answer**: d

---

## Answer Key
1.b  2.b  3.a  4.d  5.b  6.False  7.True  8.False  9.True  10.False  11.b  12.c  13.c  14.a  15.d
