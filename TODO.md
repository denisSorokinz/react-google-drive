+ Figure out rendering dynamic [id].tsx document
    +1. create a utility function to fetch a particular document from Firebase using JS SDK

+ Fix DocumentsSection


+ authenticate user before accessing document (conditional rendering if not logged in -> create withAuthentication HOC?) OR use NextJS session

+ render out props

+ handle no document with such id

+ figure out RTE:
    ~ startup error
        ~ add css loader

+ add description property to Firestore

+ init name and description

+ styles

~ description update
    + implement updateDocument
    + figure out how to get string value of editor field
    ~ withAuth HOC: pass currentUser as a prop
    ~ update Firebase document

~ name update

~ refactor
