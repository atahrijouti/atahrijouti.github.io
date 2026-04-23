import { html, type Metadata } from "unbundle"

export const metadata: Metadata = {
  title: "Playground",
  description: "A sandbox to play with the toys I have made, this is my playground and yours",
}

export const content = () => {
  return html`<div>
    <style>
      main {
        max-width: 720px;
        line-height: 1.5;
      }
    </style>
    <h1>Playground</h1>
    <p>
      When you write a Rust program, every value you create lives somewhere in memory. Most of the
      time you don't need to think about where — the compiler figures it out. But when performance
      matters, or when you're debugging a subtle bug, knowing exactly how Rust lays out data can
      make all the difference.
    </p>

    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum et dolorum fuga.
    </p>

    <p>
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
      sit amet quam egestas semper auctor.
    </p>

    <p>
      Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis molestie
      lacinia ultricies, arcu ipsum aliquet mauris, vitae tincidunt nisi sem quis diam. Pellentesque
      habitant morbi tristique senectus et netus malesuada.
    </p>

    <p>
      Fusce fermentum. Nullam varius nulla at mauris dignissim, vel suscipit erat luctus. Cras non
      purus in turpis tincidunt luctus. Vivamus tincidunt, metus vel posuere ullamcorper, turpis
      nunc volutpat libero, vitae gravida nunc turpis non nisi.
    </p>

    <p>
      Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra
      felis nunc et lorem. Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum
      primis in faucibus orci luctus et ultrices posuere cubilia.
    </p>

    <p>
      Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus. Cum sociis natoque penatibus
      et magnis dis parturient montes, nascetur ridiculus mus. Nulla posuere. Donec vitae dolor.
      Nullam tristique diam non turpis. Cras placerat accumsan nulla.
    </p>

    <p>
      Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,
      commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
      ipsum rutrum orci, sagittis tempus lacus enim ac dui.
    </p>

    <p>
      Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus
      faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat.
      Nam dui mi, tincidunt quis, accumsan porttitor facilisis.
    </p>

    <p>
      Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a,
      ultricies in, diam. Sed arcu. Cras consequat. Praesent dapibus, neque id cursus faucibus,
      tortor neque egestas augue eu vulputate magna eros eu erat volutpat.
    </p>
  </div>`
}
