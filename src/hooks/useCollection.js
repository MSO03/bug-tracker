import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/firebaseConfig";

export default function useCollection(collection, _query, _order, id) {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(true);
  const [documents, setData] = useState(null);
  const query = useRef(_query).current;
  const orderby = useRef(_order).current;

  useEffect(() => {
    let ref = db.collection(collection);
    if (id) ref = ref.doc(id);
    if (query) ref = ref.where(...query);
    if (orderby) ref = ref.orderBy(...orderby);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        setPending(true);
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results);
        setError(null);
        setPending(false);
      },
      (err) => {
        setError(err.message);
        setPending(false);
      }
    );

    return () => unsub();
  }, [collection, orderby, query, id]);

  return { error, pending, documents };
}
