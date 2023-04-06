// function animateValue(obj, start, end, duration) {
//     let startTimestamp = null;
//     const step = (timestamp) => {
//         if (!startTimestamp) startTimestamp = timestamp;
//         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
//         obj.innerHTML = Math.floor(progress * (end - start) + start);
//         if (progress < 1) {
//             window.requestAnimationFrame(step);
//         }
//     };
//     window.requestAnimationFrame(step);
// }

// const obj = document.getElementById("score-number");

// setTimeout(() => {
//     animateValue(obj, 0, 76, 1000)
// }, 1000);


ScrollReveal().reveal(".main");
ScrollReveal().reveal(".rate",{delay: 1000});
ScrollReveal().reveal(".description",{delay: 1100});

ScrollReveal().reveal(".reaction",{delay: 1120});
ScrollReveal().reveal(".memory",{delay: 1320});
ScrollReveal().reveal(".verbal",{delay: 1420});
ScrollReveal().reveal(".visual",{delay: 1520});
ScrollReveal().reveal(".continue",{delay: 1620});




