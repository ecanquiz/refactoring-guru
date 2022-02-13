import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `<h1>Hello Vite!</h1>`
////////////////////////////////////////////////////////////////////////////////////

abstract class SocialNetworkPoster {
    /**
     * The actual factory method. Note that it returns the abstract connector.
     * This lets subclasses return any concrete connectors without breaking the
     * superclass' contract.
     */
    public abstract getSocialNetwork(): SocialNetworkConnector;

    /**
     * When the factory method is used inside the Creator's business logic, the
     * subclasses may alter the logic indirectly by returning different types of
     * the connector from the factory method.
     */
    public post(content: string): void {
        // Call the factory method to create a Product object...
        const network = this.getSocialNetwork();
        // ...then use it as you will.
        network.logIn();
        network.createPost(content);
        network.logOut();
    }
}

/**
 * This Concrete Creator supports Facebook. Remember that this class also
 * inherits the 'post' method from the parent class. Concrete Creators are the
 * classes that the Client actually uses.
 */
class FacebookPoster extends SocialNetworkPoster {
    private login = "";
    private password = "";

    public constructor(login: string, password: string) {
        super();
        this.login = login;
        this.password = password;
    }

    public getSocialNetwork(): SocialNetworkConnector {
        return new FacebookConnector(this.login, this.password);
    }
}

/**
 * This Concrete Creator supports LinkedIn.
 */
class LinkedInPoster extends SocialNetworkPoster {
    private email = ""
    private password = ""

    public constructor(email: string, password: string) {
        super();
        this.email = email
        this.password = password
    }

    public getSocialNetwork(): SocialNetworkConnector {
        return new LinkedInConnector(this.email, this.password);
    }
}

/**
 * The Product interface declares behaviors of various types of products.
 */
interface SocialNetworkConnector {
    logIn(): void;

    logOut(): void;

    createPost(content: string): void;
}

/**
 * This Concrete Product implements the Facebook API.
 */
class FacebookConnector implements SocialNetworkConnector {
    private login = ""
    private password = ""

    public constructor(login: string, password: string) {
        this.login = login
        this.password = password
    }

    public logIn(): void {
        console.log(`Send HTTP API request to log in user ${this.login} with password ${this.password}`)
    }

    public logOut(): void {
        console.log(`Send HTTP API request to log out user ${this.login}`)
    }

    public createPost(content: string): void {
        console.log(`Send HTTP API requests to create a post in Facebook timeline ${content}`)
    }
}

/**
 * This Concrete Product implements the LinkedIn API.
 */
class LinkedInConnector implements SocialNetworkConnector {
    private email = ""
    private password = ""

    public constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    public logIn(): void {
        console.log(`Send HTTP API request to log in user ${this.email} with password ${this.password}`)
    }

    public logOut(): void {
        console.log(`Send HTTP API request to log out user ${this.email}`)
    }

    public createPost(content: string): void {
        console.log(`Send HTTP API requests to create a post in LinkedIn timeline ${content}`)
    }
}

/**
 * The client code can work with any subclass of SocialNetworkPoster since it
 * doesn't depend on concrete classes.
 */
function clientCode(creator: SocialNetworkPoster) {
    // ...
    creator.post("Hello world!");
    creator.post("I had a large hamburger this morning!");
    // ...
}

/**
 * During the initialization phase, the app can decide which social network it
 * wants to work with, create an object of the proper subclass, and pass it to
 * the client code.
 */
console.log("Testing ConcreteCreator1:")
clientCode(new FacebookPoster("john_smith", "******"))
console.log("")

console.log("Testing ConcreteCreator2:")
clientCode(new LinkedInPoster("john_smith@example.com", "******"))

