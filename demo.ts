function createInstance(construct: { new (): Object }) {
  return new construct();
}

class A {}

createInstance(A);

type T = typeof createInstance;

function msgbox(msg: string) {
  return msg;
}

// let shouldContinue: typeof msgbox("Are you sure you want to continue?");

// type MessageOf<T extends { message: any }> = T["message"];

// interface Email {
//   message: string;
// }

// type EmailMessageContents = MessageOf<Email>;

// type Flatten<T> = T extends any[] ? T[number] : Flatten<T>;

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

const a = [1, 2, [3, 4, 5, [6]]];

type DEMO = typeof a;

type C = Flatten<DEMO>;

type OK = 1;

interface HttpResponse<T extends Array<any>> {
  data: T;

  code: number;

  msg: string;
}

interface SuccessResponse<T extends any[]> extends HttpResponse<T> {
  code: 1;
}

interface ErrorResponse<T extends any[]> extends HttpResponse<T> {
  // code ????
}

const my_response: SuccessResponse<number[]> = {
  code: 1,
  data: [1, 2, 3],
  msg: "OK",
};

let point = [1, 2] as const;
