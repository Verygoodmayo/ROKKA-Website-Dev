import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollforMore as ScrollForMore } from "../../components/UI"; // Adjust the import path as necessary
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesNavigationItem({ title, index, globalIndex, setGlobalIndex }) {
  const isActive = globalIndex === index;
  const itemRef = useRef();
  

  // useEffect(() => {
  //   if (!itemRef.current) return;
  //   // if (isActive) {
      
  //     // Create Timeline for the current item
  //     const masterTimeline = gsap.timeline({ id: 'master-timeline', paused: true, label: `item-${index}` });
  //     const toActiveTimline = gsap.timeline({ id: 'to-active-timeline', paused: true, label: `item-${index}`});
  //     const toInactiveTimeline = gsap.timeline({ id: 'to-inactive-timeline', paused: true, label: `item-${index}`});
  //     const toActiveNextTimline = gsap.timeline({ id: 'to-active-next-timeline', paused: true, label: `item-${index}`});


  //     // To Active Animation

  //     toActiveTimline.to(itemRef.current, {
  //       flex: 1,
  //       ease: "power2.out",
  //     });
  //     toActiveTimline.to(itemRef.current.children[0], {
  //       fontSize: "200pt",
  //       ease: "power2.inOut",
  //     }, '<');

  //     // To Inactive Animation
  //     toActiveTimline.to(itemRef.current, {
  //       flex: 0,
  //       ease: "power2.out",
  //     });
  //     toActiveTimline.to(itemRef.current.children[0], {
  //       fontSize: "12pt",
  //       ease: "power2.inOut",
  //     }, '<-=0.25');
  //     toActiveTimline.to(itemRef.current.children[1], {
  //       opacity: 1,
  //       ease: "power2.inOut",
  //     }, '<-=0.25');
  //     toActiveTimline.to(itemRef.current.children[2], {
  //       opacity: 0,
  //       ease: "power2.inOut",
  //     }, '<-=0.25');
  //     toActiveTimline.set(itemRef.current.children[2], {
  //       display: 'none',
  //     },'<-=0.24');

  //     // To Active Next Animation
  //     if (index < 3) {
  //       toActiveNextTimline.to(itemRef.current.nextSibling, {
  //         flex: 1,
  //         ease: "power2.out",
  //       });
  //       toActiveNextTimline.to(itemRef.current.nextSibling.children[0], {
  //         fontSize: "200pt",
  //         ease: "power2.inOut",
  //       }, '<');
  //       toActiveNextTimline.to(itemRef.current.nextSibling.children[1], {
  //         opacity: 0,
  //         ease: "power2.inOut",
  //       }, '<-=0.25');
  //       if (itemRef.current.nextSibling.children[2]) {
  //         toActiveNextTimline.to(itemRef.current.nextSibling.children[2], {
  //           opacity: 1,
  //           ease: "power2.inOut",
  //         }, '<-=0.25');
  //         toActiveNextTimline.set(itemRef.current.nextSibling.children[2], {
  //           display: 'flex',
  //         },'<-=0.24');
  //       }
  //     }
      
      

  //     masterTimeline.add(toActiveTimline);
  //     masterTimeline.add(toInactiveTimeline);
  //     if (index < 3) {
  //       // If there is a next sibling, add the toActiveNextTimline
  //       // to the master timeline
  //       masterTimeline.add(toActiveNextTimline);
  //     }
      

      // Create ScrollTrigger for the timeline

      // ScrollTrigger.create({
      //   trigger: itemRef.current.parentElement,
      //   start: index * 100 + "% center",
      //   end: () => (index < 3) ? (index + 1) * 100 + "% center" : 'bottom center',
      //   scrub: true,
      //   toggleActions: "play reverse play reverse",
      //   markers: true,
      //   animation: masterTimeline,
      // })

      

    // } else {
    //   // Animate to inactive state
    //   // gsap.to(itemRef.current, {
    //   //   flex: 0,
    //   //   backgroundColor: "transparent",
    //   //   alignItems: "center",
    //   //   duration: 0.3,
    //   //   ease: "power2.inOut",
    //   // });
    // }
  // }, [index]);

  return (
    <div
      ref={itemRef}
      className={`feature-navigation-item${isActive ? " active" : ""}`}
      onClick={() => setGlobalIndex(index)}
      style={{
        cursor: "pointer",
        transition: "box-shadow 0.3s, border-radius 0.3s",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span className="index">{index + 1}</span>
      {!isActive && <h2 className="title">{title}</h2>}
      {isActive && <h2 className="title active">{title}</h2>}
      {/* {isActive && <div className="scroll-for-more">{"Scroll for More"}</div>} */}
      {isActive && <ScrollForMore />}
    </div>
  );
}