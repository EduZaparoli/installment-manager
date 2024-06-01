"use client";
import React, { createContext, useContext } from "react";
import { ClientStore, clientStore } from "../stores/ClientStore";

interface IProps {
	children: React.ReactNode;
}

interface IStoreContext {
	clientStore: ClientStore;
}

const StoreContext = createContext<IStoreContext>({ clientStore });

export const StoreProvider: React.FC<IProps> = ({ children }) => {
	return <StoreContext.Provider value={{ clientStore }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
