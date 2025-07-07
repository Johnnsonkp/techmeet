// types/modules.d.ts
declare module '@react-native-async-storage/async-storage' {
    export interface AsyncStorageStatic {
        getItem(key: string): Promise<string | null>;
        setItem(key: string, value: string): Promise<void>;
        removeItem(key: string): Promise<void>;
        clear(): Promise<void>;
        getAllKeys(): Promise<string[]>;
        multiGet(keys: string[]): Promise<[string, string | null][]>;
        multiSet(keyValuePairs: [string, string][]): Promise<void>;
        multiRemove(keys: string[]): Promise<void>;
    }

    const AsyncStorage: AsyncStorageStatic;
    export default AsyncStorage;
}

declare module '@react-navigation/native' {
    import { NavigationContainer, NavigationContainerRef } from '@react-navigation/core';
    import { NavigationProp, RouteProp, ParamListBase } from '@react-navigation/core';

    export { NavigationContainer, NavigationContainerRef };
    export { NavigationProp, RouteProp, ParamListBase };
    export { useFocusEffect, useNavigation, useRoute, useNavigationState } from '@react-navigation/core';

    export interface DefaultTheme {
        dark: boolean;
        colors: {
            primary: string;
            background: string;
            card: string;
            text: string;
            border: string;
            notification: string;
        };
    }

    export const DefaultTheme: DefaultTheme;
    export const DarkTheme: DefaultTheme;
}

declare module '@react-navigation/native-stack' {
    import { ParamListBase, RouteProp, NavigationProp } from '@react-navigation/native';
    import { ComponentType } from 'react';

    export interface NativeStackNavigationProp<
        ParamList extends ParamListBase,
        RouteName extends keyof ParamList = keyof ParamList
    > extends NavigationProp<ParamList, RouteName> {
        push<RouteName extends keyof ParamList>(
            name: RouteName,
            params?: ParamList[RouteName]
        ): void;
        pop(count?: number): void;
        popToTop(): void;
        replace<RouteName extends keyof ParamList>(
            name: RouteName,
            params?: ParamList[RouteName]
        ): void;
    }

    export interface NativeStackScreenProps<
        ParamList extends ParamListBase,
        RouteName extends keyof ParamList = keyof ParamList
    > {
        navigation: NativeStackNavigationProp<ParamList, RouteName>;
        route: RouteProp<ParamList, RouteName>;
    }

    export function createNativeStackNavigator<ParamList extends ParamListBase>(): {
        Navigator: ComponentType<any>;
        Screen: ComponentType<any>;
        Group: ComponentType<any>;
    };
}

declare module '@react-navigation/core' {
    import { ComponentType } from 'react';

    export interface ParamListBase {
        [key: string]: object | undefined;
    }

    export interface NavigationProp<
        ParamList extends ParamListBase,
        RouteName extends keyof ParamList = keyof ParamList
    > {
        navigate<RouteName extends keyof ParamList>(
            name: RouteName,
            params?: ParamList[RouteName]
        ): void;
        goBack(): void;
        reset(state: any): void;
        setParams(params: Partial<ParamList[RouteName]>): void;
        canGoBack(): boolean;
    }

    export interface RouteProp<
        ParamList extends ParamListBase,
        RouteName extends keyof ParamList = keyof ParamList
    > {
        key: string;
        name: RouteName;
        params: ParamList[RouteName];
    }

    export interface NavigationContainerRef {
        navigate<RouteName extends keyof ParamListBase>(
            name: RouteName,
            params?: ParamListBase[RouteName]
        ): void;
        goBack(): void;
        reset(state: any): void;
    }

    export const NavigationContainer: ComponentType<{
        children: React.ReactNode;
        ref?: React.Ref<NavigationContainerRef>;
        theme?: any;
    }>;

    export function useNavigation<T = NavigationProp<ParamListBase>>(): T;
    export function useRoute<T = RouteProp<ParamListBase>>(): T;
    export function useNavigationState<T = any>(selector: (state: any) => T): T;
    export function useFocusEffect(effect: () => void | (() => void)): void;
}

declare module 'expo-secure-store' {
    export interface SecureStoreOptions {
        keychainService?: string;
        sharedPreferencesName?: string;
        encrypt?: boolean;
        authenticationPrompt?: string;
        requireAuthentication?: boolean;
    }

    export function getItemAsync(key: string, options?: SecureStoreOptions): Promise<string | null>;
    export function setItemAsync(key: string, value: string, options?: SecureStoreOptions): Promise<void>;
    export function deleteItemAsync(key: string, options?: SecureStoreOptions): Promise<void>;
    export function isAvailableAsync(): Promise<boolean>;
}

declare module 'expo-auth-session' {
    export interface AuthRequest {
        clientId: string;
        scopes?: string[];
        redirectUri: string;
        responseType: string;
        state?: string;
        codeChallenge?: string;
        codeChallengeMethod?: string;
    }

    export interface AuthResponse {
        type: 'success' | 'error' | 'cancel';
        params?: {
            code?: string;
            access_token?: string;
            error?: string;
            error_description?: string;
        };
        url?: string;
    }

    export function makeRedirectUri(options?: { scheme?: string; path?: string }): string;
    export function useAuthRequest(config: AuthRequest): [AuthRequest | null, AuthResponse | null, () => Promise<AuthResponse>];

    export namespace AuthSession {
        export function getRedirectUrl(path?: string): string;
    }
}