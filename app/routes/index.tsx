import { ActionFunction, LoaderFunction, MetaFunction, useActionData, useTransition } from "remix";
import { Form, useLoaderData, json } from "remix";
import { fetchThemes } from "~/utils/themes.server";
import type { Themes } from "~/types/Theme";
import { FormField } from "~/components/Field";
import { Input } from "~/components/Input";
import { Select } from "~/components/Select";
import { Row } from "~/components/Row";
import { Switch } from "~/components/Switch";
import { useDisabled } from "~/utils/disabled";
import { generateBadgeUrl, parseValues } from "~/utils/generate.server";
import { Preview } from "~/components/Preview";
import { Button } from "~/components/Button";

export const meta: MetaFunction = () => ({
  title: "Github README stats creator",
});

export const action: ActionFunction = async ({ request }) => {
  const data = new URLSearchParams(await request.text());
  const url = generateBadgeUrl(parseValues(data));

  return json({ url });
};

export const loader: LoaderFunction = async () => {
  const themes = await fetchThemes();
  const TWO_HOUR_MAX_AGE = 60 * 60 * 2;

  return json(
    { themes },
    {
      headers: {
        "Cache-Control": `private, max-age=${TWO_HOUR_MAX_AGE}`,
        Vary: "Cookie",
      },
    },
  );
};

export default function App() {
  const { isDisabled, handleField } = useDisabled();
  const { themes } = useLoaderData<{ themes: Themes }>();
  const { url } = useActionData() ?? {};
  const { state } = useTransition();

  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold">GitHub README Stats Creator</h1>
      </header>

      <main className="mt-3">
        <Form method="post">
          <FormField label="Github username">
            <Input spellCheck="false" type="text" name="github-username" required minLength={1} />
          </FormField>

          <FormField label="Theme">
            <Select themes={themes} name="theme" />
          </FormField>

          <Row flexLike>
            <FormField label="Custom Title">
              <Input
                disabled={isDisabled("custom-title")}
                spellCheck="false"
                type="text"
                name="custom-title"
              />
            </FormField>

            <FormField label="Line Height">
              <Input
                defaultValue={25}
                spellCheck="false"
                type="number"
                name="line-height"
                required
                minLength={1}
              />
            </FormField>
          </Row>

          <Row>
            <FormField label="Show Icons">
              <Switch defaultSelected name="show-icons">
                Show Icons
              </Switch>
            </FormField>

            <FormField label="Animations">
              <Switch defaultSelected name="animations">
                Animations
              </Switch>
            </FormField>

            <FormField label="Custom Title">
              <Switch
                defaultSelected
                name="custom-title"
                onChange={(v) => handleField("custom-title", !v)}
              >
                Custom Title
              </Switch>
            </FormField>

            <FormField label="Hide Rank">
              <Switch name="hide-rank">Hide Rank</Switch>
            </FormField>
          </Row>

          <Row flexLike>
            <FormField label="Include All Commits">
              <Switch defaultSelected name="include-all-commits">
                Include All Commits
              </Switch>
            </FormField>

            <FormField label="Count Private Contributions">
              <Switch defaultSelected name="count-private-contributions">
                Count Private Contributions
              </Switch>
            </FormField>
          </Row>

          <Button disabled={state !== "idle"} type="submit">
            Generate!
          </Button>
        </Form>

        {url ? <Preview url={url} /> : null}
      </main>
    </>
  );
}
