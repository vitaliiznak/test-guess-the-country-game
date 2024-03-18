"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";


const GeoGame = dynamic(() => import("./components/GeoGame/GeoGameMain"), {
  ssr: false,
});

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

export default function CountriesGamePage() {
  return (
    <ApolloProvider client={client}>
        <Suspense fallback={<div>Loading...</div>}>
          <GeoGame/>
        </Suspense>
    </ApolloProvider>
  );
}
