# Is it the logic or it's the presentation? 
When splitting the view from logic, and applying "flat data presentation" principle, we sometimes come across the question: "does it relate to presentation, or to data itself"?
General rule of thumb is: "if in doubt, this is most likely the logic". But... :)

### Samples: ###

1.
A:
```typescript jsx
<div>{book.author}: {book.name}</div>
```
B:
```typescript jsx
<div><strong>{book.author}</strong>: {book.name}</div>
```
C:
```typescript jsx
<div><strong>{book.author.includes(' ') ? book.author: book.author.toUpperCase()}</strong>: {book.name}</div>
```

2.
```typescript jsx
<div>
    {data.events.map((event: CartEventDto, ticketIndex: number) => {
        return getEventTickets(event).map((price: any, index: number) => {
            const cartPrice = event.priceOptions.find((item: any) => item.optionId === price.id);
            const currentCard = event.cartsData?.find(({ id }) => price.id === id);
            const { delivery: currentDelivery, availableDelivery } = currentCard || {};
            return (
                cartPrice && (
                    <CheckOutTicket
                      {...cartPrice}
                    />
                )
            );
        });
    })}
</div>
```

### "Logic" or "presentation"? ###
Is something the "logic" or "presentation" is not a simple question that can be answered once and forever. 
It's better to think of logic/presentation as a "scale", not just two "dots".  

In the sample (1A) it's the primitive concatenation that is somewhere right in the middle of the scale. 

Sample 2 is definitely on the edge of "logic". Filtering, ordering, merging data - this is not OK in JSX for sure. Simplistic data UI transformations (1B) - might be both, 1C is a mix of logic and presentation and a place of Decisions, not Rules. 
